import React from 'react';
import { Message } from '../../types/Message';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  showAvatar: boolean;
  showTimestamp: boolean;
  senderName: string;
  senderAvatar?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  showAvatar,
  showTimestamp,
  senderName,
  senderAvatar
}) => {
  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} items-end space-x-2`}>
      {/* Avatar for received messages */}
      {!isOwnMessage && (
        <div className="w-8 h-8 flex-shrink-0">
          {showAvatar && (
            senderAvatar ? (
              <img
                src={senderAvatar}
                alt={senderName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {senderName.charAt(0)}
                </span>
              </div>
            )
          )}
        </div>
      )}

      {/* Message Content */}
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} max-w-xs sm:max-w-md`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-900'
          } break-words`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Timestamp and Read Status */}
        {showTimestamp && (
          <div className={`flex items-center mt-1 space-x-1 ${
            isOwnMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row'
          }`}>
            <span className="text-xs text-gray-500">
              {formatTime(message.timestamp)}
            </span>
            
            {/* Read status for sent messages */}
            {isOwnMessage && (
              <div className="text-gray-400">
                {message.read ? (
                  <CheckCheck className="h-3 w-3" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spacer for sent messages to align with avatar space */}
      {isOwnMessage && <div className="w-8 h-8 flex-shrink-0" />}
    </div>
  );
};

export default MessageBubble;