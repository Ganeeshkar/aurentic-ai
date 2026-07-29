export type FaqItem = { question: string; answer: React.ReactNode };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq reveal">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p className="faq-body">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
