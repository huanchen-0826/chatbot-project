import dayjs from 'dayjs';
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/profile-1.jpg'
import './ChatMessage.css'

export function ChatMessage({ message, sender, time }) {
  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'
    }>
      { sender === 'robot' && (
        <img src={RobotProfileImage} 
        className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">
        {message}
        {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      { sender === 'user' && (
        <img src={UserProfileImage} 
        className="chat-message-profile"
        />
      )}
    </div>
  );
}