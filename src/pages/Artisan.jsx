import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";
import { apiGet, apiPost } from "../services/api";

export default function Artisan() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Formulaire contrôlé
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchArtisan() {
      try {
        setLoading(true);
        setLoadError(null);
        const data = await apiGet(`/artisans/${id}`);
        if (!mounted) return;
        setArtisan(data || null);
      } catch (err) {
        if (!mounted) return;
        setLoadError("Impossible de charger la fiche artisan. Veuillez réessayer.");
        setArtisan(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) fetchArtisan();

    return () => {
      mounted = false;
    };
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // validation simple côté client
    if (!form.name || !form.email || !form.subject || !form.message) {
      setSubmitResult({ ok: false, message: "Veuillez remplir tous les champs." });
      return;
    }

    try {
      setSubmitting(true);
      setSubmitResult(null);
      await apiPost(`/artisans/${id}/contact`, form);
      setSubmitResult({ ok: true, message: "Message envoyé !" });
      // reset du formulaire
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitResult({ ok: false, message: "Erreur lors de l'envoi. Réessayez plus tard." });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mt-4">
          <p className="text-muted">Chargement de la fiche artisan…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <Header />
        <main className="container mt-4">
          <div className="alert alert-danger" role="alert">
            {loadError}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!artisan) {
    return (
      <>
        <Header />
        <main className="container mt-4">
          <p className="text-muted">Artisan introuvable.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mt-4" id="main-content">
        <h1>{artisan.name}</h1>

        <div className="mb-2">
          <RatingStars rating={artisan.note ?? 0} />
        </div>

        <p className="text-muted">
          {artisan.specialite?.name ?? "Spécialité non renseignée"} — {artisan.city ?? artisan.location ?? "Localisation non renseignée"}
        </p>

        <section className="mt-4">
          <h2>A propos</h2>
          <p>{artisan.about ?? "Aucune description fournie."}</p>
        </section>

        <section className="mt-4">
          <h2>Contact</h2>

          {submitResult && (
            <div
              className={`alert ${submitResult.ok ? "alert-success" : "alert-danger"}`}
              role="status"
              aria-live="polite"
            >
              {submitResult.message}
            </div>
          )}

          <form onSubmit={handleSubmit} aria-label={`Formulaire de contact pour ${artisan.name}`}>
            <div className="mb-3">
              <label htmlFor="contact-name" className="form-label">Nom</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-email" className="form-label">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="form-control"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-subject" className="form-label">Objet</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="form-control"
                placeholder="Objet du message"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-control"
                placeholder="Votre message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Envoi…" : "Envoyer"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

