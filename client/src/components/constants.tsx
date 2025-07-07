// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const LogoIcon = (props: { size?: number; color?: string }): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 60} height={props.size || 60} viewBox="0 0 125 125">
    <g transform="translate(0.000000,128.000000) scale(0.050000,-0.050000)" fill="rgb(0, 120, 212)" stroke="none">
      <path d="M1084 2450 c-1175 -256 -1256 -1897 -112 -2281 478 -161 1124 71 1338 478 l40 77 -186 178 c-217 209 -222 210 -311 72 -394 -616 -1213 -185 -1006 529 129 445 691 548 954 175 156 -222 123 -225 391 28 l158 150 -40 77 c-193 370 -774 615 -1226 517z m567 -167 c215 -75 409 -213 506 -361 31 -46 29 -50 -65 -135 -91 -83 -152 -110 -152 -67 0 123 -438 439 -790 569 -189 70 299 65 501 -6z m-569 -123 c175 -32 337 -120 222 -120 -94 0 -289 -88 -383 -173 -439 -394 -253 -1183 308 -1308 133 -30 137 -44 26 -89 -218 -90 -493 -54 -655 85 -518 443 -356 1459 255 1603 103 25 106 25 227 2z m1005 -1362 c116 -102 116 -97 -21 -240 -199 -209 -547 -342 -813 -311 -125 15 -159 44 -73 63 238 52 760 431 760 551 0 40 58 16 147 -63z" />
    </g>
  </svg>
);

export const VideoIcon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    style={{ marginRight: '8px' }}
  >
    <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.11-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.55V4.275l-3.5 1.55V11.175zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
  </svg>
);

export const PhoneIcon = (): JSX.Element => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '8px' }}
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

export const FullscreenEnterIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

export const FullscreenExitIcon = (): JSX.Element => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
);

export const CloseIcon = (): JSX.Element => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
