"use client"

import { createContext, useState,ReactNode, useContext } from "react";


type NotificationType = "success" | 'error' | "warning" | 'info';


interface NotificationContextType {
    showNotification : (message: string, type:NotificationType) => void;

}

const NotificationContext = createContext<NotificationContextType | undefined> (
    undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    id: number;
  } | null>(null);


  const showNotification = (message: string, type: NotificationType)=>{
    const id = Date.now();
    setNotification({message,type,id});
    setTimeout(() => {
        setNotification((current) => (current?.id === id ? null : current));
    },3000);

  };

  return (
    <NotificationContext.Provider value= {{ showNotification}}>
        {children}
        {notification && (
  <div className="fixed top-6 right-6 z-[100]">
    <div className={`px-6 py-4 rounded-lg shadow-lg font-semibold text-[#e0e6ed] dark:text-[#e0e6ed] bg-[#232946] dark:bg-[#232946] transition-all duration-300 ${getAlertClass(notification.type)}`}> 
      <span>{notification.message}</span>
    </div>
  </div>
)}
    </NotificationContext.Provider>


  )
};

function getAlertClass(type: NotificationType): string {
    switch(type){
        case "success":
            return 'alert-success';
        case "error":
            return "alert-error";
        case "warning":
            return "alert-warning";
        case "info":
            return "alert-info";
        default:
            return "alert-info";              
    }
}


export function useNotification(){
    const context = useContext(NotificationContext);
    if(context === undefined){
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        )
    }
    return context;

}