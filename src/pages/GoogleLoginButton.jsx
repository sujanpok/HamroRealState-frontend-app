// GoogleLoginButton.jsx
import React, { useEffect, useRef } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function GoogleLoginButton({ onSuccess, onError }) {
  const buttonRef = useRef(null);

  // (1) Googleスクリプトを一度だけ追加
  useEffect(() => {
    if (window.google) return; // 既にロードされている場合は何もしない
    if (!document.getElementById("google-client")) {
      const script = document.createElement("script");
      script.id = "google-client";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Loaded
      };
      document.body.appendChild(script);
    }
  }, []);

  // (2) ボタンの描画とGoogleログイン初期化
  useEffect(() => {
    if (!window.google || !GOOGLE_CLIENT_ID || !buttonRef.current) return;

    // 前回のボタンを消す(再レンダリング対策)
    buttonRef.current.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        const { credential } = response;
        if (!credential) {
          onError && onError("Google credential not received");
          return;
        }
        try {
          // サーバーにid_tokenを投げてJWTを取得
          const res = await fetch(`${API_BASE_URL}/login/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: credential }),
          });
          const data = await res.json();
          if (res.ok && data.token) {
            onSuccess && onSuccess(data.token, data.profile);
          } else {
            onError && onError(data.error || data.message || "Google login failed");
          }
        } catch (err) {
          onError && onError("Google login failed (network/server error)");
        }
      },
      ux_mode: "popup", // 一般的な挙動（ワンタイムだけど強制ではありません）
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: "100%",
    });
  }, [onSuccess, onError]);

  return <div ref={buttonRef} style={{ width: "100%" }} />;
}
