import { useReveal } from '../lib/hooks.js';

export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`rv ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
