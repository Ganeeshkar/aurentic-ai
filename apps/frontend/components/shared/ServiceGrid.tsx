export type ServiceItem = {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  bullets: string[];
};

export function ServiceGrid({ items }: { items: ServiceItem[] }) {
  return (
    <div className="svc-grid reveal-stagger">
      {items.map((item) => (
        <div className="svc" key={item.title}>
          <span className="s-ico" aria-hidden="true">
            {item.icon}
          </span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <ul>
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
