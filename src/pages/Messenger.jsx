/*  ─────────────────────────────────────────────────────────
    Messenger.jsx
    • Mobile UX now mimics Messenger / WhatsApp
      – contact list first → tap contact → full-screen chat
      – back arrow (↩) in chat header on mobile only
    • Desktop UX: list + chat side-by-side
    • Dark-mode ready (relies on your global CSS variables)
    • Dummy data only – drop in real API later
    • Smooth fade-up animation for every new bubble
    ───────────────────────────────────────────────────────── */
import React, { useState, useRef, useEffect } from 'react';
import { BsArrowLeft, BsSend, BsCheck2All } from 'react-icons/bs';

/* ───────────  dummy data  ─────────── */
const contacts = [
  {
    id: 2,
    name: 'ThemeMu',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    online: false
  },
  {
    id: 3,
    name: 'Demo Steve',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    online: true
  }
];

const me = {
  id: 1,
  name: 'Themesflat',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  online: true
};

const dummyMessages = {
  2: [
    {
      id: 1,
      senderId: 2,
      text: 'Nullam lacinia lorem id sapien suscipit.',
      time: '3 days ago'
    },
    {
      id: 2,
      senderId: 1,
      text: 'Hi! How can I help you?',
      time: '3 days ago'
    }
  ],
  3: [
    {
      id: 1,
      senderId: 3,
      text: 'Hello, do you have an update?',
      time: '1 day ago'
    }
  ]
};

/* ───────────  view-port hook  ─────────── */
const useIsMobile = (bp = 768) => {
  const [mobile, setMobile] = useState(window.innerWidth < bp);
  useEffect(() => {
    const resize = () => setMobile(window.innerWidth < bp);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [bp]);
  return mobile;
};

/* ───────────  component  ─────────── */
export default function Messenger() {
  const isMobile = useIsMobile();

  const [convos, setConvos] = useState(dummyMessages);
  const [activeId, setActiveId] = useState(isMobile ? null : contacts[0].id);
  const [draft, setDraft] = useState('');

  const endRef   = useRef(null);
  const inputRef = useRef(null);

  const activeUser = contacts.find((c) => c.id === activeId);

  /* auto-scroll & focus */
  useEffect(() => {
    if (!activeUser) return;
    const t = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [activeId, convos]);

  /* desktop – ensure someone is open */
  useEffect(() => {
    if (!isMobile && activeId == null) setActiveId(contacts[0].id);
  }, [isMobile, activeId]);

  /* send message */
  const send = (e) => {
    e.preventDefault();
    const msg = draft.trim();
    if (!msg || activeId == null) return;
    const newMsg = {
      id: (convos[activeId]?.length || 0) + 1,
      senderId: me.id,
      text: msg,
      time: 'now'
    };
    setConvos((p) => ({
      ...p,
      [activeId]: [...(p[activeId] || []), newMsg]
    }));
    setDraft('');
  };

  /* ───────────  UI parts  ─────────── */

  const ContactList = () => (
    <aside
      className="contacts bg-body border-end p-3"
      style={{ width: 270, maxWidth: 330 }}
    >
      <h6 className="text-uppercase fw-bold text-secondary mb-3">
        Chats
      </h6>
      <ul className="list-unstyled mb-0">
        {contacts.map((u) => {
          const selected = u.id === activeId;
          return (
            <li
              key={u.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveId(u.id)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveId(u.id)}
              className={`d-flex align-items-center gap-3 p-2 rounded ${
                selected ? 'bg-primary bg-opacity-25' : 'hover-lift'
              }`}
            >
              <div className="position-relative">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="rounded-circle"
                  width={46}
                  height={46}
                />
                {u.online && (
                  <span
                    className="bg-success border border-light rounded-circle position-absolute bottom-0 end-0"
                    style={{ width: 11, height: 11 }}
                  />
                )}
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-semibold">{u.name}</h6>
                <small className="text-muted">
                  {u.online ? 'Online' : 'Offline'}
                </small>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );

  const ChatScreen = () =>
    activeUser ? (
      <section className="chat d-flex flex-column flex-grow-1">
        {/* header */}
        <header className="d-flex align-items-center gap-3 p-3 border-bottom bg-body-tertiary">
          {isMobile && (
            <button
              className="btn btn-link text-decoration-none p-0 fs-4 me-2"
              onClick={() => setActiveId(null)}
            >
              <BsArrowLeft />
            </button>
          )}
          <img
            src={activeUser.avatar}
            className="rounded-circle"
            alt={activeUser.name}
            width={46}
            height={46}
          />
          <div>
            <h6 className="mb-0 fw-semibold">{activeUser.name}</h6>
            <small className="text-muted">
              {activeUser.online ? 'Active now' : 'Offline'}
            </small>
          </div>
        </header>

        {/* messages */}
        <main
          className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2"
          style={{ background: 'var(--bg-secondary)' }}
        >
          {convos[activeId]?.map((m) => {
            const mine = m.senderId === me.id;
            return (
              <div
                key={m.id}
                className={`d-flex ${
                  mine ? 'justify-content-end' : 'justify-content-start'
                }`}
              >
                <div
                  className={`fade-in-up p-3 rounded-3 shadow-sm ${
                    mine ? 'bg-primary text-white' : 'bg-body'
                  }`}
                  style={{ maxWidth: '75%' }}
                >
                  <p className="mb-1 lh-base">{m.text}</p>
                  <small className="d-flex align-items-center gap-1 text-muted justify-content-end">
                    {mine && <BsCheck2All />} {m.time}
                  </small>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </main>

        {/* composer */}
        <form
          onSubmit={send}
          className="d-flex gap-2 p-3 border-top bg-body"
        >
          <input
            ref={inputRef}
            className="form-control"
            placeholder="Message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="off"
          />
          <button className="btn btn-primary d-flex align-items-center gap-1">
            Send <BsSend />
          </button>
        </form>
      </section>
    ) : (
      <section className="flex-grow-1 d-flex align-items-center justify-content-center text-muted">
        <p>Select a chat to start messaging</p>
      </section>
    );

  /* ───────────  layout  ─────────── */
  return (
    <div
      className="messenger-wrapper d-flex flex-column flex-lg-row rounded shadow-sm overflow-hidden"
      style={{ height: '90vh' }}
    >
      {/* Show list if desktop OR no chat selected (mobile) */}
      {(!isMobile || !activeUser) && <ContactList />}
      <ChatScreen />
    </div>
  );
}
