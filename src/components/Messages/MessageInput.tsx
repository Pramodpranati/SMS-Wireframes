import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileUpload = () => {
    // In a real app, this would open a file picker
    console.log('File upload clicked');
  };

  const handleVoiceRecord = () => {
    // In a real app, this would start/stop voice recording
    setIsRecording(!isRecording);
    console.log('Voice record clicked');
  };

  return (
    <div className="flex items-end space-x-2">
      {/* File Upload Button */}
      <button
        onClick={handleFileUpload}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full flex-shrink-0"
        title="Attach file"
      >
        <Paperclip className="h-5 w-5" />
      </button>

      {/* Message Input Container */}
      <div className="flex-1 relative">
        <div className="flex items-end bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 px-4 py-3 bg-transparent border-none outline-none resize-none max-h-32"
            style={{ minHeight: '44px' }}
          />
          
          <div className="flex items-center space-x-1 px-2 pb-3">
            {/* Emoji Button */}
            <button
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
              title="Add emoji"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Voice Record / Send Button */}
      {message.trim() ? (
        <button
          onClick={handleSend}
          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex-shrink-0 transition-colors"
          title="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={handleVoiceRecord}
          className={`p-3 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-gray-500 hover:bg-gray-600'
          } text-white rounded-full flex-shrink-0 transition-colors`}
          title={isRecording ? 'Stop recording' : 'Record voice message'}
        >
          <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
        </button>
      )}
    </div>
  );
};

export default MessageInput;