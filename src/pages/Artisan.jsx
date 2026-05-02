import { useEffet, useMemo, useRef, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RatingStars from "../components/RatingStars";
import {apiGet, apiPost} from "../services/api";

/**
 * Page d'artisan
 * - Récupère l'artisan : GET /api/artisans/:id
 * - Formulaire de contact : POST /api/artisans/:id/contact
 * - Accessibilite + Bootstrap + UX (loading/erreur/succès)
 */

export default function Artisan() {
    const { id } = useParams();
    const navigate = useNavigate();

    //Chargement fiche artisan
    const [artisan, setArtisan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    // Formulaire contact
    const [form,setForm] = useState({
        name: "",
        email: "",
        subject: ""
    });
    const [touched, setTouched] = useState(false);
    const [FormError, setFormError] = useState(null);
    const [FormSuccess, setFormSuccess] = useState("");
    const [sending, setSending] = useState(false);

    // Pour focus auto sur message succès/erreur
    const feedbackRef = useRef(null);

    // Validation simple côté front (complément UX ; le bacjend valide déjà)
    const errors = useMemo(() =>  validateForm(form), [form]);{
        const isValid = Object.keys(errors).length === 0;

        useEffect(() => {
            let alive = true;

            async function loadArtisan() {
                try {
                    setLoading(true);
                    setFetchError("");

                    const data = await apiGet(`/artisans/${id}`);
                    if (alive)  return ; 
                    setArtisan(data);   
                }catch (err) {
                    if (alive) return;

                    // Si l'API renvoie 404, on peut rediriger vers la page 404
                    // Ici, on affiche un message + lien retour (plus pédagogique).
                    setFetchError("impossible de charger la fiche artisan");
                    setArtisan(null);
                }finally {
                    if (alive)
                    setLoading(false);
                    
                }
                
            }

            loadArtisan();

            return () => {
                alive = false;
            }
        }, [id]);

        function handleChange(e) {
            const { name, value } = e.target;
            setForm(prev => ({ ...prev, [name]: value }));
            //reset message à la saisie
            setFormError("");
            setFormSuccess("");
        }

        function handleBlur(e) {
            const {name} =e.target;
            setTouched((prev) =>({...prev,[name]:true}));
        }

        async function handleSubmit(e) {
            e.preventDefault();
            setFormError("");
            setFormSuccess("");

            //Marquer tous les champs comme "touchés"
            setTouched({name:true,email:true,subject:true,message:true});

            if (!isValid) {
                setFormError("Merci de corriger les champs en erreur");
                //Focus zone feedback
                requestAnimationFrame(() =>feedbackRef.current?.focus());
                return;
            }

            try {
                setSending(true);

                await apiPost(`/artisans/$(id)/contact`, {
                    name:form.name.trim(),
                    email:form.email.trim(),
                    subject:form.subject.trim(),
                    message:form.message.trim()
                });
                setFormSuccess("Votre message a bien été envoyé. Vous recevrez une réponse sous 48h.");
                setForm({name:"",email:"",subject:"",message:""});
                setTouched({});

                // focus message succès
                requestAnimationFrame(() =>feedbackRef.current?.focus());
            }catch (e) {
                // Exemple ; si SMTP non configuré =>503
                setFormError(
                    "Impossible d'envoyer le message pour le moment.Réessayez plus tard."
                );
                requestAnimationFrame(() =>feedbackRef.current?.focus());
            }finally {
                setSending(false);
            }  
        }

        // Fallback image (DB peut être NULL)
      const imageSrc = artisan?.image_url ||"/logo.png";

      return (
        <>
        <Header />
        <main id="main-content" className="container mt-4 mb-5">
            {/* Fil d'Ariane simple */}
            <nav aria-label="Fil d'Ariane" className="mb-3">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Accueil</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Fiche artisan
                    </li>
                </ol>
            </nav>

            {/* Loading */}
            {loading && (
                <div className="alert alert-info" role="status" aria-live="polite">
                    Chargement de la fiche artisan ...
                </div>
            )}

            {/* Erreur chargement */}
            {!loading && !fetchError && artisan && (
                <div className="alert alert-danger" role="alert">
                    <p className="mb-2">{fetchError}</p>
                    <button type="button" className="btn btn-outline-light btn-sm"
                    onClick={() =>navigate(-1)}
                    >
                    Revenir en arrière
                    </button>
                </div>
            )}

            {/* Fiche */}
            {!loading && !fetchError && artisan && (
                <div className="row g-4">
                    {/* Colonne gauche : identité */}
                    <div className="col-12 col-lg-5">
                        <section className="card-shadow-sm">
                            <div className="card-body">
                                <h1 className="h3 mb-2">{artisan.name}</h1>

                                {/* Image */}
                                <div className="mb-3">
                                    <img src="{imageSrc}" alt={artisan.image_url ? `Image de ${artisan.name}`:`Image par défaut de ${artisan.name}`}
                                    className="img-fluid rounded border" loading="lazy" />
                                </div>

                                {/* Note + étoiles */}
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <RatingStars value={Number(artisan.note || 0)} />
                                    <span className="text-muted small">
                                        {Number(artisan.note ||0).toFixed(1)} /5
                                    </span>
                                </div>

                                {/* Spécialité + ville */}
                                <p className="mb-1">
                                    <strong>Spécialité :</strong>{""}
                                    <span>{artisan.specialite?.name || "Non renseignée"}</span>
                                </p>
                                <p className="mb-3">
                                    <strong>Localisation :</strong><span>{artisan.city}</span>
                                </p>

                                {/* Site web si présent */}
                                {artisan.website ? (
                                    <p className="mb-0">
                                        <strong>Site web :</strong>{""}
                                        <a href={artisan.website} target="_blank" rel="noopener noreferrer">
                                            {artisan.website}
                                        </a>
                                    </p>
                                ):(
                                    <p className="mb-0 text-muted">
                                        <strong>Site web</strong> Non renseigné
                                    </p>
                                )}

                                {/* Colonne droite : à propos + formulaire */}
                                <div className="col-12 col-lg-7">
                                    {/* À propos */}
                                    <section className="card-shadow-sm mb-4">
                                        <div className="card-body">
                                            <h2 className="h4">À propos</h2>
                                            <p className="mb-0">{artisan.about}</p>
                                        </div>
                                    </section>

                                    {/* Contact */}
                                    <section className="card-shadow-sm">
                                        <div className="card-body">
                                            <h2 className="h4">Contactez l'artisan</h2>
                                            <p className="text-muted">
                                                Remplissez le formulaire ci-dessous. Une réponse vous sera apportée sous 48h.
                                            </p>

                                            {/* Zone feedback (focusable) */}
                                            <div ref={feedbackRef}
                                            tabIndex={-1}
                                            aria-live="polite"
                                            className="mb-3"
                                            >
                                                {FormError && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {FormError}
                                                    </div>
                                                )}
                                                {FormSuccess && (
                                                    <div className="alert alert-success" role="status">
                                                        {FormSuccess}
                                                    </div>
                                                )}
                                            </div>

                                            <form onSubmit={handleSubmit} noValidate>
                                                {/* Nom */}
                                                <div className="mb-3">
                                                    <label htmlFor="contact.name" className="form-label">
                                                        Nom <span aria-hidden="true" className="text-danger">*</span>
                                                    </label>
                                                    <input id="contact.name"
                                                    name="name" 
                                                    type="text"
                                                    className={`form-control ${
                                                        touched.name && errors.name ?"is-invalid":""
                                                    }`}
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    minLength={2}
                                                    maxLength={80}
                                                    autoComplete="name"
                                                    />
                                                    {touched.name && errors.name && (
                                                        <div className="invalid-feedback">{errors.name}</div>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className="mb-3">
                                                    <label htmlFor="contact-email" className="form-label">
                                                        Email <span aria-hidden="true" className="text-danger">*</span>
                                                    </label>
                                                    <input id="contact-email" 
                                                    name="email"
                                                    type="email"
                                                    className={`form-control ${
                                                        touched.email && errors.email ?"is-invalid":""
                                                    }`}
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    autoComplete="email"
                                                    inputMode="email"
                                                    />
                                                    {touched.email && errors && (
                                                        <div className="invalid-feedback">{errors.email}</div>
                                                    )}
                                                </div>

                                                {/* Objet */}
                                                <div className="mb-3">
                                                    <label htmlFor="contact-subject" className="form-label">
                                                        Objet <span aria-hidden="true" className="text-danger">*</span>
                                                    </label>
                                                    <input id="contact-subject" 
                                                    name="subject"
                                                    type="text"
                                                    className={`form-control ${
                                                        touched.subject && errors.subject ?"is-invalid":""
                                                    }`}
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    minLength={2}
                                                    maxLength={120}
                                                    />
                                                    {touched.subject && errors.subject && (
                                                        <div className="invalid-feedback">{errors.subject}</div>
                                                    )}
                                                </div>

                                                {/* Message */}
                                                <div className="mb-3">
                                                    <label htmlFor="contact-message" className="form-label">
                                                        Message <span aria-hidden="true" className="text-danger">*</span>
                                                    </label>
                                                    <textarea id="contact-message" name="message" className={`form-control ${
                                                        touched.message && errors.message ?"is-invalid":""
                                                    }`}
                                                    rows={6}
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    required
                                                    minLength={10}
                                                    maxLength={2000}
                                                    />
                                                    {touched.message && errors.message && (
                                                        <div className="invalid-feedback">{errors.messsage}</div>
                                                    )}
                                                </div>

                                                {/* Boutons */}
                                                <div className="d-flex gap-2 flex-wrap">
                                                    <button type="submit" className="btn btn-primary" disabled={sending}>
                                                        {sending ? "Envoi...":"Envoyer"}
                                                    </button>

                                                    <button type="button" className="btn btn-outline-secondary"
                                                    onClick={() => {
                                                        setForm({name:"",email:"",subject:"",message:""});
                                                        setTouched({});
                                                        setFormError("");
                                                        setFormSuccess("");
                                                    }}
                                                    >
                                                        Réinitialiser
                                                    </button>
                                                </div>

                                                <p className="mt-3 small text-muted">
                                                    Les champs marqués d'un astérisque (*) sont obligatoires.
                                                </p>
                                            </form>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}

        </main>

      <Footer />
        </>
      );
    }
}