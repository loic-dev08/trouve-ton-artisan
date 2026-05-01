export default function RatingStars({ value }) {
    const stars =Math.round(value);

    return(
        <span aria-label={`Note ${value} sur 5`}>
            {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
        </span>
    );
}
