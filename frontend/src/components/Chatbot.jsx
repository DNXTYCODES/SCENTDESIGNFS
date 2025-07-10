import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    window.difyChatbotConfig = {
      token: 'bBGwJk9m1YaIAn90',
      systemVariables: {
        // user_id: 'YOU CAN DEFINE USER ID HERE',
      },
    };

    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js';
    script.id = 'bBGwJk9m1YaIAn90';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <style>
      {`
        #dify-chatbot-bubble-button {
          background-color: #6d28d9 !important;
          bottom: 2rem !important;
          right: 2rem !important;
          z-index: 1000 !important;
        }
        
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
          bottom: 6rem !important;
          right: 2rem !important;
          z-index: 999 !important;
          border-radius: 1rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border: 1px solid #e9d5ff !important;
        }
        
        @media (max-width: 768px) {
          #dify-chatbot-bubble-button {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          
          #dify-chatbot-bubble-window {
            width: 90% !important;
            height: 70vh !important;
            bottom: 5rem !important;
            right: 1rem !important;
          }
        }
        
        /* Custom styling for Scent Design */
        .dify-chatbot-avatar {
          background-color: #6d28d9 !important;
        }
        
        .dify-chatbot-bubble {
          background-color: #6d28d9 !important;
          color: white !important;
        }
        
        .dify-chatbot-input {
          border: 1px solid #e9d5ff !important;
          border-radius: 0.5rem !important;
        }
        
        .dify-chatbot-send-button {
          background-color: #6d28d9 !important;
        }
      `}
    </style>
  );
};

export default Chatbot;