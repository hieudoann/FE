import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import React, { useRef, useState } from 'react';

const App = () => {
    const apiRef = useRef();
    const [logItems, updateLog] = useState([]);
    const [showNew, toggleShowNew] = useState(false);
    const [knockingParticipants, updateKnockingParticipants] = useState([]);

    const printEventOutput = (payload) => {
        updateLog((items) => [...items, JSON.stringify(payload)]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog((items) => [...items, `${feature} off`]);
        } else {
            updateLog((items) => [...items, `${feature} on`]);
        }
    };

    const handleChatUpdates = (payload) => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
        updateLog((items) => [...items, `you have ${payload.unreadCount} unread messages`]);
    };

    const handleKnockingParticipant = (payload) => {
        updateLog((items) => [...items, JSON.stringify(payload)]);
        updateKnockingParticipants((participants) => [...participants, payload?.participant]);
    };

    const resolveKnockingParticipants = (condition) => {
        knockingParticipants.forEach((participant) => {
            apiRef.current.executeCommand(
                'answerKnockingParticipant',
                participant?.id,
                condition(participant)
            );
            updateKnockingParticipants((participants) =>
                participants.filter((item) => item.id === participant.id)
            );
        });
    };

    const handleJitsiIFrameRef1 = (iframeRef) => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '600px';
        iframeRef.style.marginBottom = '20px';
    };

    const handleApiReady = (apiObj) => {
        apiRef.current = apiObj;
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('audioMuteStatusChanged', (payload) =>
            handleAudioStatusChange(payload, 'audio')
        );
        apiRef.current.on('videoMuteStatusChanged', (payload) =>
            handleAudioStatusChange(payload, 'video')
        );
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
    };

    const handleReadyToClose = () => {
        /* eslint-disable-next-line no-alert */
        alert('Ready to close...');
    };

    const generateRoomName = () => `${Math.random() * 100}-${Date.now()}`;

    // Adjusted: Only show a single video instance based on `showNew`
    const renderVideoInstance = () => {
        if (showNew) {
            return (
                <JitsiMeeting
                    roomName={generateRoomName()}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.marginTop = '10px';
                        iframeRef.style.border = '10px dashed #df486f';
                        iframeRef.style.padding = '5px';
                        iframeRef.style.height = '600px';
                    }}
                />
            );
        } else {
            return (
                <JaaSMeeting
                    roomName={generateRoomName()}
                    useStaging={true}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.border = '10px solid #3d3d3d';
                        iframeRef.style.background = '#3d3d3d';
                        iframeRef.style.height = '600px';
                        iframeRef.style.marginBottom = '20px';
                    }}
                />
            );
        }
    };

    const renderButtons = () => (
        <div style={{ margin: '15px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    type="button"
                    style={{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#3D3D3D',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px',
                    }}
                    onClick={() => toggleShowNew(!showNew)}
                >
                    Toggle instance
                </button>
            </div>
        </div>
    );

    const renderLog = () => logItems.map((item, index) => (
        <div
            style={{
                fontFamily: 'monospace',
                padding: '5px',
            }}
            key={index}
        >
            {item}
        </div>
    ));

    return (
        <>
            <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>OpenVidu</h1>
            {renderVideoInstance()}
            {renderButtons()}
            {renderLog()}
        </>
    );
};

export default App;
