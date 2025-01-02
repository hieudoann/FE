// src/component/TemperatureMonitor/TemperatureMonitor.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';

const TemperatureMonitor = () => {
  // State to track which sensors have already triggered an alert
  const [alertedSensors, setAlertedSensors] = useState({
    nhiet_do1: false,
    nhiet_do2: false,
    nhiet_do3: false,
  });

  useEffect(() => {
    const checkTemperature = async () => {
      try {
        const response = await axios.get('https://iomt.hoangphucthanh.vn/index.php?latest');
        const data = response.data;
        console.log('Fetched data:', data);

        const sensorsExceeded = [];

        // Check each sensor and handle alerts
        if (data.nhiet_do1 > 20 && !alertedSensors.nhiet_do1) {
          sensorsExceeded.push('Temperature 1');
          handleAlert('Temperature 1', data.nhiet_do1);
          setAlertedSensors(prevState => ({ ...prevState, nhiet_do1: true }));
        } else if (data.nhiet_do1 <= 20 && alertedSensors.nhiet_do1) {
          setAlertedSensors(prevState => ({ ...prevState, nhiet_do1: false }));
        }

        if (data.nhiet_do2 > 30 && !alertedSensors.nhiet_do2) {
          sensorsExceeded.push('Temperature 2');
          handleAlert('Temperature 2', data.nhiet_do2);
          setAlertedSensors(prevState => ({ ...prevState, nhiet_do2: true }));
        } else if (data.nhiet_do2 <= 30 && alertedSensors.nhiet_do2) {
          setAlertedSensors(prevState => ({ ...prevState, nhiet_do2: false }));
        }

        if (data.nhiet_do3 > 30 && !alertedSensors.nhiet_do3) {
          sensorsExceeded.push('Temperature 3');
          handleAlert('Temperature 3', data.nhiet_do3);
          setAlertedSensors(prevState => ({ ...prevState, nhiet_do3: true }));
        } else if (data.nhiet_do3 <= 30 && alertedSensors.nhiet_do3) {
          setAlertedSensors(prevState => ({ ...prevState, nhiet_do3: false }));
        }

        // If any sensors exceeded, send an email
        if (sensorsExceeded.length > 0) {
          sendEmail(data, sensorsExceeded);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleAlert = (sensorName, temperature) => {
      window.alert(`${sensorName} has exceeded 30°C with a temperature of ${temperature}°C`);
    };

    const sendEmail = (data, sensorsExceeded) => {
      const subject = 'Temperature Alert';
      const message = sensorsExceeded.map(sensor => {
        const tempKey = sensor === 'Temperature 1' ? 'nhiet_do1' :
                        sensor === 'Temperature 2' ? 'nhiet_do2' : 'nhiet_do3';
        return `${sensor}: ${data[tempKey]}°C`;
      }).join('\n');

      const templateParams = {
        to_email: 'nphuc09430@gmail.com',
        subject: subject,
        message: `
          The following temperature sensors have exceeded 30°C:
          ${message}
        `,
      };

      emailjs.send(
        'service_pg08y86',    // Replace with your EmailJS Service ID
        'template_sc0x7nc',   // Replace with your EmailJS Template ID
        templateParams,
        'HY9Ui5w-7gUjDBPSR'   // Replace with your EmailJS User ID
      )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
      });
    };

    // Check temperature every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(checkTemperature, 5000);

    // Initial check
    checkTemperature();

    return () => clearInterval(intervalId);
  }, [alertedSensors]); // Depend on alertedSensors to keep state updated

  return null; // This component doesn't render anything
};

export default TemperatureMonitor;