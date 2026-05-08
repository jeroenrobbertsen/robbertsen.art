import { useState, useEffect, useRef } from "react";

/* ─── Colors ─── */
const C = {
  bg: "#0a0a0a",
  cream: "#f0ece4",
  gold: "#d4993d",
  mid: "#888",
  border: "#222",
  blue: "#839fd0",
  green: "#a3b18a",
  warm: "#d4967e",
  purple: "#ad9cc0",
};

/* ─── Works data ─── */
const WORKS = [
  {
    title: "Fire | Water | Earth",
    year: "2025",
    medium: "Oil paint on paper",
    size: "31 × 41 cm",
    image: "/images/fire-water-earth.jpg",
    accent: C.warm,
  },
  {
    title: "Creatures 02",
    year: "2024",
    medium: "Ink on paper",
    size: "42 × 59.4 cm",
    image: "/images/creatures-02.jpg",
    accent: C.blue,
  },
  {
    title: "Terschelling",
    year: "2020",
    medium: "Pencil on paper",
    size: "29.7 × 42 cm",
    image: "/images/terschelling.jpg",
    accent: C.purple,
    wide: true,
  },
  {
    title: "Figures 01",
    year: "2022",
    medium: "Pencil on paper",
    size: "31 × 41 cm",
    image: "/images/figures-01.jpg",
    accent: C.green,
  },
  {
    title: "Figures 02",
    year: "2024",
    medium: "Pencil on paper",
    size: "31 × 41 cm",
    image: "/images/figures-02.jpg",
    accent: C.warm,
  },
  {
    title: "Forms 00",
    year: "2024",
    medium: "Oil paint on paper",
    size: "31 × 41 cm",
    image: "/images/forms-00.jpg",
    accent: C.blue,
  },
  {
    title: "Forms 01",
    year: "2024",
    medium: "Oil on canvas",
    size: "50 × 70 cm",
    image: "/images/forms-01.jpg",
    accent: C.gold,
  },
];

/* ─── Work Card ─── */
function WorkCard({ work, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isWide = work.wide;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isWide ? "1 / -1" : "auto",
        maxWidth: isWide ? "none" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
      }}
    >
      {/* Cream card */}
      <div
        style={{
          background: C.cream,
          padding: isWide ? "20px 20px 12px" : "16px 16px 10px",
          boxShadow: hovered
            ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${work.accent}22`
            : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.4s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            aspectRatio: isWide ? "4/3" : "3/4",
            background: "#e8e4dc",
            position: "relative",
          }}
        >
          <img
            src={work.image}
            alt={work.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.02)" : "scale(1)",
            }}
          />
        </div>
        {/* Info below image */}
        <div style={{ paddingTop: 10 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            {work.title}
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: 1,
              color: "#666",
              marginTop: 2,
            }}
          >
            {work.year} · {work.medium} · {work.size}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Navigation ─── */
function Nav({ page, setPage }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        gap: 40,
        padding: "24px 0",
        background: "linear-gradient(to bottom, #0a0a0aee 0%, #0a0a0acc 60%, transparent 100%)",
      }}
    >
      {["home", "about"].map((p) => (
        <span
          key={p}
          onClick={() => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontSize: 11,
            fontWeight: page === p ? 400 : 300,
            letterSpacing: 3,
            textTransform: "uppercase",
            cursor: "pointer",
            color: page === p ? C.gold : C.mid,
            transition: "color 0.3s ease",
            borderBottom: page === p ? `1px solid ${C.gold}44` : "1px solid transparent",
            paddingBottom: 4,
          }}
        >
          {p === "home" ? "Works" : "About"}
        </span>
      ))}
    </nav>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "60px 24px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        marginTop: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 32,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { label: "Instagram", href: "https://instagram.com/robbertsen.art" },
          { label: "ArtConnect", href: "https://artconnect.com" },
          { label: "Email", href: "mailto:hello@robbertsen.art" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              fontWeight: 300,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#bbb",
              transition: "color 0.3s ease",
              padding: "8px 0",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
          >
            {link.label}
          </a>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 300, color: "#bbb", letterSpacing: 1 }}>
          Amsterdam, The Netherlands
        </div>
        <div style={{ fontSize: 10, fontWeight: 300, letterSpacing: 2, color: "#999", marginTop: 8 }}>
          © 2026 Robbertsen Art
        </div>
      </div>
    </footer>
  );
}

/* ─── Mobile hook ─── */
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Home Page ─── */
function Home() {
  const [loaded, setLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 60px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <img
          src="/images/logo-white.png"
          alt="Robbertsen Art"
          style={{
            height: 80,
            marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease 0.2s",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              height: 1,
              width: loaded ? 60 : 0,
              background: `linear-gradient(90deg, transparent, ${C.gold}66)`,
              transition: "width 1.2s ease 0.5s",
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 300,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: C.mid,
              opacity: loaded ? 1 : 0,
              transition: "opacity 1s ease 0.7s",
            }}
          >
            Contemporary Art
          </span>
          <div
            style={{
              height: 1,
              width: loaded ? 60 : 0,
              background: `linear-gradient(90deg, ${C.gold}66, transparent)`,
              transition: "width 1.2s ease 0.5s",
            }}
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 24,
        }}
      >
        {WORKS.map((work, i) => (
          <WorkCard key={work.title} work={work} index={i} />
        ))}
      </section>

      {/* ArtConnect link */}
      <div style={{ textAlign: "center", padding: "0 24px 40px" }}>
        <a
          href="https://artconnect.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 10,
            fontWeight: 300,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: C.mid,
            borderBottom: `1px solid ${C.border}`,
            paddingBottom: 4,
            transition: "color 0.3s ease, border-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = C.gold;
            e.currentTarget.style.borderColor = C.gold + "44";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = C.mid;
            e.currentTarget.style.borderColor = C.border;
          }}
        >
          View & purchase on ArtConnect →
        </a>
      </div>

      <Footer />
    </div>
  );
}

/* ─── About Page ─── */
function About() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div>
      <section
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "140px 24px 60px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: C.gold,
            display: "block",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          About
        </span>

        {/* English statement */}
        <p
          style={{
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.9,
            color: "#fff",
            letterSpacing: 0.5,
            marginBottom: 40,
          }}
        >
          Jeroen Robbertsen is a multidisciplinary artist based in Amsterdam.
          Working with oil paint, ink, and pencil on paper, his practice explores
          organic forms, human figures, and the tension between structure and
          intuition. Each piece begins as an unplanned gesture — a line, a shape,
          a mark — that gradually reveals its own logic and meaning.
        </p>

        {/* Dutch statement */}
        <p
          style={{
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.9,
            color: "#fff",
            letterSpacing: 0.5,
            fontStyle: "italic",
          }}
        >
          Jeroen Robbertsen is een multidisciplinaire kunstenaar uit Amsterdam.
          Met olieverf, inkt en potlood op papier verkent hij organische vormen,
          menselijke figuren en de spanning tussen structuur en intuïtie. Elk werk
          begint als een onbepland gebaar — een lijn, een vorm, een markering —
          dat geleidelijk zijn eigen logica en betekenis onthult.
        </p>
      </section>

      <Footer />
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <Nav page={page} setPage={setPage} />
      {page === "home" ? <Home /> : <About />}
    </div>
  );
}
