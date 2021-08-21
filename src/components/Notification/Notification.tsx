import React from "react";

interface INotificationProps {
  text: string;
}

const Notification: React.FC<INotificationProps> = ({ text }) => {
  return <h2>{text}</h2>;
};

export default Notification;
