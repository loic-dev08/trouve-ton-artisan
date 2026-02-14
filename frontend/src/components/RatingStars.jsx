export default function RatingStars({ note }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(note));

  return (
    <div className="stars">
      {stars.map((filled, i) => (
        <span key={i}>{filled ? "★" : "☆"}</span>
      ))}
    </div>
  );
}