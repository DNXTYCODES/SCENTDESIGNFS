export default function Bottle({ color }) {
  return (
    <svg viewBox="0 0 80 130" aria-hidden="true">
      <rect x="30" y="4" width="20" height="16" rx="3" fill="#c9963b" />
      <rect x="35" y="18" width="10" height="10" fill="#e8c47a" />
      <rect x="10" y="28" width="60" height="96" rx="14" fill={color} />
      <rect
        x="16"
        y="34"
        width="8"
        height="82"
        rx="4"
        fill="#fff"
        opacity=".25"
      />
      <rect
        x="26"
        y="62"
        width="38"
        height="30"
        rx="4"
        fill="#fff"
        opacity=".9"
      />
      <text
        x="45"
        y="82"
        fontSize="14"
        textAnchor="middle"
        fill="#0f172a"
        fontFamily="serif"
        fontWeight="700"
      >
        SDN
      </text>
    </svg>
  );
}