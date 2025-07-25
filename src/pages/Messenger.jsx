import React, { useState, useRef, useEffect } from "react";

const users = [
  {
    id: 2,
    name: "ThemeMu",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    online: false,
  },
  {
    id: 3,
    name: "Demo Steve",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    online: true,
  },
];
const currentUser = {
  id: 1,
  name: "Themesflat",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  online: true,
};
const initialMessages = {
  2: [
    {
      id: 1,
      senderId: 2,
      text: "Nullam lacinia lorem id sapien suscipit.",
      time: "3 days ago",
      type: "text",
    },
    {
      id: 2,
      senderId: 1,
      text: "Hi! How can I help you?",
      time: "3 days ago",
      type: "text",
    },
  ],
  3: [
    { id: 1, senderId: 3, text: "Hello, do you have an update?", time: "1 day ago", type: "text" },
  ],
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

export default function ResponsiveChat() {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState(initialMessages);
  const [selectedUserId, setSelectedUserId] = useState(isMobile ? null : users[0].id);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  // Scroll to bottom and focus input when chat opens or messages change
  useEffect(() => {
    if (selectedUserId !== null) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [selectedUserId, messages]);

  // On mobile: if window resized from desktop, ensure a user is selected
  useEffect(() => {
    if (!isMobile && selectedUserId === null) {
      setSelectedUserId(users[0].id);
    }
    if (isMobile && selectedUserId === undefined) {
      setSelectedUserId(null);
    }
  }, [isMobile, selectedUserId]);

  function handleSend(e) {
    e.preventDefault();
    if (!input || selectedUserId == null) return;
    const newMsg = {
      id: (messages[selectedUserId]?.length || 0) + 1,
      senderId: currentUser.id,
      text: input,
      time: "now",
      type: "text",
    };
    setMessages(prev => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMsg],
    }));
    setInput("");
  }

  // ==============
  //   RENDERING
  // ==============
  // Chat list column
  const chatList = (
    <div
      className="d-flex flex-column border-end bg-white"
      style={{
        width: isMobile ? "100%" : 280,
        minWidth: 180,
        maxWidth: 350,
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
        overflowY: "auto",
        height: "100%",
      }}
    >
      <div className="p-3 border-bottom fw-bold fs-5" style={{ borderTopLeftRadius: 18 }}>
        Chats
      </div>
      {users.map((u) => (
        <div
          key={u.id}
          className={`d-flex align-items-center px-3 py-2 ${selectedUserId === u.id ? 'bg-light' : 'bg-white'} text-dark`}
          style={{
            cursor: "pointer",
            borderLeft: selectedUserId === u.id ? '3px solid #1976d2' : '3px solid transparent'
          }}
          onClick={() => setSelectedUserId(u.id)}
        >
          <img src={u.avatar} alt={u.name} className="rounded-circle me-2" style={{ width: 42, height: 42, objectFit: "cover", border: "2px solid #f0f0f0" }} />
          <div>
            <div className="fw-semibold">{u.name}</div>
            <span className={`small ${u.online ? "text-success" : "text-secondary"}`}>
              <i className={`bi bi-dot me-1`} style={{ fontSize: 20, verticalAlign: "middle" }}></i>
              {u.online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Chat window column
  const chatWindow = selectedUser && (
    <div className="d-flex flex-column flex-grow-1 position-relative" style={{ minWidth: 0, borderRadius: 18 }}>
      {/* Header */}
      <div
        className="card-header bg-white d-flex align-items-center gap-3"
        style={{
          minHeight: 78,
          borderTopRightRadius: 18,
          borderTopLeftRadius: isMobile ? 18 : 0,
          top: 0,
          zIndex: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          borderBottom: '1px solid #eee'
        }}
      >
        {isMobile &&
          <button
            className="btn btn-link p-0 me-2 d-flex align-items-center"
            style={{
              fontSize: 28,
              color: "#1976d2",   // Your theme blue, set to any color you prefer!
              background: "none",
              border: "none"
            }}
            onClick={() => setSelectedUserId(null)}
            type="button"
            aria-label="Back"
          >
            <i className="bi bi-arrow-left"></i>
          </button>
        }
        <img
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="rounded-circle"
          style={{ width: 54, height: 54, objectFit: "cover", border: "2px solid #907979ff" }}
        />
        <div>
          <div className="fw-bold fs-5">{selectedUser.name}</div>
          <span className={`small fw-semibold ${selectedUser.online ? "text-success" : "text-secondary"}`}>
            <i className={`bi bi-dot me-1`} style={{ fontSize: 20, verticalAlign: "middle" }}></i>
            {selectedUser.online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      {/* Chat body */}
      <div
        className="flex-grow-1 px-3 px-md-4"
        style={{
          overflowY: "auto",
          background: "#f8f9fa",
          paddingTop: "1.2rem",
          paddingBottom: "1.2rem",
          scrollBehavior: "smooth",
          minHeight: 0,
        }}
      >
        {(messages[selectedUserId] || []).map((msg) => {
          const sender = msg.senderId === currentUser.id ? currentUser : selectedUser;
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`d-flex mb-4 ${isMe ? "flex-row-reverse text-end" : ""}`} >
              <div className="me-2 ms-2 flex-shrink-0">
                <img
                  src={sender.avatar}
                  alt={sender.name}
                  className="rounded-circle"
                  style={{
                    width: 38,
                    height: 38,
                    objectFit: "cover",
                    border: "2px solid #fff",
                  }}
                />
              </div>
              <div style={{ maxWidth: 420 }}>
                <div className="fw-bold mb-1" style={{ fontSize: 15 }}>
                  {sender.name}
                </div>
                <div className="small text-muted mb-1">{msg.time}</div>
                <div
                  className={`p-2 rounded-3 mb-1 ${ isMe ? "bg-primary text-white" : "bg-white border" }`}
                  style={{ fontSize: 15, wordBreak: "break-word" }}
                >
                  {msg.type === "text" && msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Typing box */}
      <div className="card-footer bg-white border-top" style={{ borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
        <form
          className="d-flex align-items-center gap-2 flex-wrap"
          onSubmit={handleSend}
        >
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ minWidth: 0 }}
            ref={inputRef}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  );

  // Layout: 2 columns on desktop, single pane on mobile.
  return (
    <div className="container-fluid py-4" style={{ minHeight: "100vh", background: "#817a7aff" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
          <div
            className="card shadow-sm d-flex flex-row"
            style={{
              minHeight: 520,
              borderRadius: 18,
              height: '75vh',
              maxHeight: 700,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* On mobile, only one of the list or chat is visible */}
            {isMobile ? (
              selectedUserId === null ? chatList : chatWindow
            ) : (
              <>
                {chatList}
                {chatWindow}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
