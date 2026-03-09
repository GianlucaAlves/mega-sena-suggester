import Roleta from '../components/Roleta';

const COLORS = {
    branco: '#FFFFFF',
    fundo: '#050505',
    painel: 'rgba(255,255,255,0.04)',
    borda: 'rgba(255,255,255,0.09)',
    textoSecundario: 'rgba(255,255,255,0.72)',
};

const FONT_FAMILY = 'Inter, "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

function SorteioPage(){
    return (
        <div
            style={{
                minHeight: 'calc(100vh - 94px)',
                backgroundColor: COLORS.fundo,
                padding: '40px 20px 56px',
                fontFamily: FONT_FAMILY,
                boxSizing: 'border-box',
            }}
        >
            <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <section
                    style={{
                        backgroundColor: COLORS.painel,
                        border: `1px solid ${COLORS.borda}`,
                        borderRadius: 28,
                        padding: '32px clamp(20px, 4vw, 40px)',
                        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <h1 style={{ margin: '0 0 12px', color: COLORS.branco, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.05 }}>
                        Sorteio visual
                    </h1>
                    <p style={{ margin: 0, color: COLORS.textoSecundario, fontSize: 17, lineHeight: 1.6, maxWidth: 760 }}>
                        Rode o sorteio, revele as dezenas sorteadas e compare o resultado com os jogos que você salvou.
                    </p>
                </section>

                <Roleta />
            </div>
        </div>
    )
}

export default SorteioPage;