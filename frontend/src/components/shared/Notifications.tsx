"use client";

import React from "react";

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsProps {
  notifications: Notification[];
}

export default function Notifications({ notifications }: NotificationsProps) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md max-w-md font-vazir text-yellow-400">
      <h2 className="text-xl font-bold mb-3">اعلان‌ها</h2>
      {notifications.length === 0 ? (
        <p>اعلانی وجود ندارد.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`p-2 rounded ${
                note.read ? "bg-yellow-900" : "bg-yellow-700 font-bold"
              }`}
            >
              <p>{note.message}</p>
              <p className="text-xs text-yellow-300">{new Date(note.date).toLocaleString("fa-IR")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
