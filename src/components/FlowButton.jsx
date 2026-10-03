export default function FlowButton({ text = "Modern Button", href, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className="flow-button"
    >
      <i className="ri-arrow-right-line flow-button-arr flow-button-arr-left" aria-hidden="true" />
      <span className="flow-button-text">{text}</span>
      <span className="flow-button-circle" aria-hidden="true" />
      <i className="ri-arrow-right-line flow-button-arr flow-button-arr-right" aria-hidden="true" />
    </a>
  );
}
