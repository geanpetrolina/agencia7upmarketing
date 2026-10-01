import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight, BrainCircuit, Check, ChevronDown, ExternalLink, GitBranch, Menu,
  MessageCircle, MousePointer2, Play, ShieldCheck, Sparkles, Workflow, X, Zap,
  Activity, ChartNoAxesCombined
} from 'lucide-react'

const WA_PHONE = '5587988195026'
const WA = `https://web.whatsapp.com/send?phone=${WA_PHONE}`

const nav = [
  ['Início', 'hero'],
  ['Revenue OS', 'revenue-os'],
  ['Raio-X', 'raio-x'],
  ['Provas', 'provas'],
  ['Autoridade', 'autoridade'],
  ['Contato', 'contato'],
]

function Logo() {
  return <a href="#hero" className="logo" aria-label="7UP — início"><span>7</span>UP</a>
}

function Button({ children, href = WA, secondary = false }: {
  children: React.ReactNode
  href?: string
  secondary?: boolean
}) {
  const external = href.startsWith('http')
  return (
    <a className={`btn ${secondary ? 'btn-secondary' : ''}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}<ArrowRight size={16} />
    </a>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${solid ? 'solid' : ''}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="desktop-nav">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="nav-cta"><a href={WA} target="_blank" rel="noopener noreferrer">DIAGNOSTICAR OPERAÇÃO <ArrowRight size={14} /></a></div>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="mobile-panel">{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="mobile-action" href={WA} target="_blank" rel="noopener noreferrer">DIAGNOSTICAR OPERAÇÃO <ArrowRight size={16} /></a></div>}
    </header>
  )
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return <div className="section-label"><span>{number}</span><i />{title}</div>
}

function RevenueFlow() {
  const nodes = ['ATENÇÃO', 'LEAD', 'QUALIFICAÇÃO', 'VENDA', 'RECEITA']
  return <div className="flow-wrap" aria-label="Fluxo 7UP: atenção, lead, qualificação, venda e receita">
    <div className="flow-photo" />
    <div className="flow-orbit orbit-a" /><div className="flow-orbit orbit-b" /><div className="flow-grid" />
    <div className="flow-core"><div className="core-kicker">7UP REVENUE FLOW</div><div className="core-title">Revenue<br /><em>OS</em></div><div className="core-line" /></div>
    <div className="flow-nodes">{nodes.map((node, i) => <motion.div key={node} className="flow-node" animate={{ y: [0, -5, 0] }} transition={{ duration: 3.4, delay: i * .22, repeat: Infinity, ease: 'easeInOut' }}><span className="node-dot" />{node}</motion.div>)}</div>
  </div>
}

function Hero() {
  return <section id="hero" className="hero">
    <div className="hero-noise" />
    <div className="container hero-grid">
      <div className="hero-copy"><Reveal>
        <div className="eyebrow"><span />7UP — ENGENHARIA DE RECEITA & GROWTH</div>
        <h1>Marketing, vendas e tecnologia <strong>operando como um sistema.</strong></h1>
        <p>A 7UP estrutura aquisição, qualificação, vendas, CRM, automação e inteligência em uma única operação para empresas que querem crescer com mais previsibilidade.</p>
        <div className="hero-actions"><Button>QUERO DIAGNOSTICAR MINHA OPERAÇÃO</Button><Button href="#revenue-os" secondary>EXPLORAR O REVENUE OS</Button></div>
        <div className="hero-trust"><span><ShieldCheck size={15} /> Certificações Meta & Google</span><span><Activity size={15} /> Dados e operação</span><span><Sparkles size={15} /> IA & automação</span></div>
      </Reveal></div>
      <Reveal delay={.12} className="hero-visual"><RevenueFlow /></Reveal>
    </div>
    <div className="scroll-cue"><span />SCROLL PARA EXPLORAR</div>
  </section>
}

function BeliefBreak() {
  const steps = ['TRÁFEGO','LEAD','ATENDIMENTO','QUALIFICAÇÃO','PROPOSTA','FOLLOW-UP','VENDA','RECEITA']
  return <section className="section dark-break"><div className="container"><Reveal><SectionLabel number="01" title="A quebra de crença" /><h2>Seu problema pode não ser<br /><span>falta de leads.</span></h2><p className="lead-copy">Pode ser o que acontece <strong>depois que eles chegam.</strong></p></Reveal><Reveal delay={.1}><div className="journey">{steps.map((step, i) => <div className={`journey-step ${[2,3,5].includes(i) ? 'tension' : ''}`} key={step}><span>{String(i + 1).padStart(2,'0')}</span><b>{step}</b>{i < steps.length - 1 && <i />}</div>)}</div></Reveal><div className="tension-list">{['Resposta lenta','Lead sem qualificação','Follow-up perdido','CRM sem processo','Marketing desconectado do comercial'].map(x => <span key={x}>{x}</span>)}</div></div></section>
}

function Positioning() {
  return <section className="section positioning"><div className="container"><Reveal><SectionLabel number="02" title="Novo modelo" /><h2>Empresas que querem crescer<br />não precisam de <em>mais uma agência.</em></h2><p className="lead-copy">Precisam de uma <strong>operação de receita.</strong></p></Reveal><Reveal delay={.1}><div className="versus"><div className="model old"><span className="model-label">AGÊNCIA TRADICIONAL</span><div>Marketing</div><b>↓</b><div>Leads</div><b>↓</b><div>Entrega</div></div><div className="versus-mark">VERSUS</div><div className="model new"><span className="model-label">7UP</span><div>Marketing <small>+</small></div><div>Vendas <small>+</small></div><div>Tecnologia</div><b>↓</b><strong>Receita</strong></div></div></Reveal></div></section>
}

const modules = [['01','AQUISIÇÃO','Atrair a demanda certa.',MousePointer2],['02','CONVERSÃO','Transformar atenção em oportunidade.',Zap],['03','QUALIFICAÇÃO','Separar intenção de ruído.',GitBranch],['04','VENDAS','Construir processo para converter.',Workflow],['05','INTELIGÊNCIA','Decidir com dados, não achismo.',BrainCircuit]]

function RevenueOS() {
  return <section className="section os" id="revenue-os"><div className="container"><Reveal><SectionLabel number="03" title="O sistema" /><div className="os-heading"><div><h2>7UP <span>REVENUE OS</span></h2><p>Uma arquitetura que conecta marketing, vendas e tecnologia em uma única operação de crescimento.</p></div><div className="os-mark">7UP<span>OS</span></div></div></Reveal><div className="os-feature"><div className="os-feature-copy"><span>OPERATING LAYER</span><h3>Da atenção à receita.</h3><p>Menos ferramentas isoladas. Mais conexão entre as etapas que realmente movem o caixa.</p></div><div className="os-mini-flow"><b>AQUISIÇÃO</b><i>→</i><b>QUALIFICAÇÃO</b><i>→</i><b>VENDA</b><i>→</i><strong>RECEITA</strong></div></div><div className="os-stack">{modules.map(([number,name,desc,Icon], i) => { const I = Icon as React.ElementType; return <Reveal key={name as string} delay={i*.05}><div className="os-row"><span className="os-number">{number}</span><div className="os-icon"><I size={19}/></div><div className="os-name">{name}</div><div className="os-desc">{desc}</div><ArrowRight className="os-arrow" size={18}/></div></Reveal> })}</div></div></section>
}

function RevenueXRay() {
  const steps = ['AQUISIÇÃO','LEADS','ATENDIMENTO','QUALIFICAÇÃO','PROPOSTA','FOLLOW-UP','VENDA']
  return <section className="section xray" id="raio-x"><div className="container xray-grid"><Reveal><SectionLabel number="04" title="Diagnóstico" /><h2>Antes de escalar,<br /><span>descubra onde sua receita está vazando.</span></h2><p>O Raio-X da Receita identifica gargalos entre aquisição, atendimento, vendas e receita para mostrar onde a operação perde oportunidades.</p><Button>QUERO FAZER O RAIO-X</Button></Reveal><Reveal delay={.12}><div className="xray-visual"><div className="xray-topline"><span>REVENUE X-RAY</span><small>LIVE DIAGNOSTIC</small></div><div className="scanner-line" />{steps.map((step,i)=><div className="xray-step" key={step}><span>{String(i+1).padStart(2,'0')}</span><b>{step}</b><i>{i<steps.length-1?'↓':'●'}</i></div>)}</div></Reveal></div></section>
}

function ProcessTimeline() {
  const items = [['01','DIAGNOSTICAR'],['02','IMPLEMENTAR'],['03','MEDIR'],['04','OTIMIZAR'],['05','ESCALAR'],['06','DIAGNOSTICAR NOVAMENTE']]
  return <section className="section process"><div className="container"><Reveal><SectionLabel number="05" title="Ciclo operacional" /><h2>Não é uma campanha.<br /><span>É um ciclo de melhoria.</span></h2></Reveal><div className="timeline">{items.map(([number,title],i)=><Reveal key={number} delay={i*.05}><div className="timeline-item"><span>{number}</span><b>{title}</b>{i<items.length-1&&<i/>}</div></Reveal>)}</div></div></section>
}

const solutions = ['Aquisição','Landing Pages','Conversão','CRM','Automação','SDR com IA','Processos Comerciais','Dashboards','Revenue Operations']
function Solutions() {
  return <section className="section solutions" id="solucoes"><div className="container"><Reveal><SectionLabel number="06" title="As alavancas" /><div className="solutions-heading"><h2>Um sistema.<br /><span>Várias alavancas.</span></h2><p>Cada elemento existe para fortalecer o mesmo objetivo: transformar demanda em receita.</p></div></Reveal><Reveal delay={.1}><div className="solution-map"><div className="solution-center"><Logo/><small>REVENUE OS</small></div>{solutions.map((solution,i)=><div className="solution-pill" style={{'--i':i} as React.CSSProperties} key={solution}>{solution}</div>)}</div></Reveal></div></section>
}

function IdealClient() {
  const items=['Empresas com operação comercial.','Empresas que já investem em aquisição.','Empresas que querem previsibilidade.','Empresas que precisam integrar marketing e vendas.','Empresas que querem tomar decisões baseadas em dados.']
  return <section className="section ideal"><div className="container ideal-grid"><Reveal><SectionLabel number="07" title="Fit"/><h2>A 7UP é para empresas que <span>já estão em movimento.</span></h2></Reveal><Reveal delay={.1}><div className="fit-list">{items.map((item,i)=><div key={item}><Check size={17}/><span>{item}</span><small>0{i+1}</small></div>)}</div></Reveal></div></section>
}

const testimonials = [
  { name:'Jô · Multieletrica', label:'Depoimento em vídeo', video:'/assets/videos/jo-fernando.mp4', poster:'/assets/depoimentos/jo-fernando.jpg' },
  { name:'Leandro · Hanei Solutions', label:'Depoimento em vídeo', video:'/assets/videos/leandro-hanei.mp4', poster:'/assets/depoimentos/leandro-hanei.jpg' },
  { name:'Dalton · Legal Manager', label:'Depoimento em vídeo', video:'/assets/videos/dalton-legal.mp4', poster:'/assets/depoimentos/dalton-legal.jpg' },
  { name:'Enertech Motion', label:'Depoimento em vídeo', video:'/assets/videos/enertech.mp4', poster:'/assets/depoimentos/enertech.jpg' },
  { name:'Comercial Almeida', label:'Depoimento em vídeo', video:'/assets/videos/almeida.mp4', poster:'/assets/depoimentos/almeida.jpg' },
]

function VideoModal({ item, onClose }: { item: typeof testimonials[number]; onClose: () => void }) {
  return <div className="video-modal" role="dialog" aria-modal="true" onClick={onClose}><div className="video-modal-inner" onClick={e=>e.stopPropagation()}><button onClick={onClose} aria-label="Fechar"><X/></button><video src={item.video} poster={item.poster} controls autoPlay playsInline /><div><span>{item.label}</span><h3>{item.name}</h3></div></div></div>
}

function Proof() {
  const [selected, setSelected] = useState<typeof testimonials[number] | null>(null)
  return <section className="section proof" id="provas"><div className="container"><Reveal><SectionLabel number="08" title="Prova"/><div className="proof-heading"><div><h2>Não conte só o que fazemos.<br /><span>Veja quem já percebeu.</span></h2><p>Depoimentos em vídeo e evidências visuais entram no centro da operação — porque autoridade também precisa ser demonstrada.</p></div><div className="proof-stat"><b>+7</b><span>depoimentos<br/>disponibilizados</span></div></div></Reveal><div className="testimonial-grid">{testimonials.map((item,i)=><Reveal key={item.name} delay={i*.05}><button className={`testimonial-card ${i===0?'featured':''}`} onClick={()=>setSelected(item)}><div className="testimonial-media"><img src={item.poster} alt=""/><span className="play"><Play size={17} fill="currentColor"/></span></div><div className="testimonial-copy"><small>{item.label}</small><strong>{item.name}</strong><span>Assistir depoimento <ArrowRight size={13}/></span></div></button></Reveal>)}</div><Reveal delay={.12}><div className="evidence-grid"><div className="evidence-copy"><span>PROVA OPERACIONAL</span><h3>“Tivemos 9 leads nessa última semana — e a melhor notícia: todos vieram dentro do perfil.”</h3><p>Mensagem compartilhada no contexto do projeto Legal Manager, destacando também leads em tratativa e avanço para proposta.</p></div><div className="evidence-image"><img src="/assets/depoimentos/legal-manager.jpeg" alt="Feedback sobre resultados do Legal Manager"/><a href="/assets/depoimentos/legal-manager.jpeg" target="_blank" rel="noreferrer">Ver evidência <ExternalLink size={13}/></a></div></div></Reveal></div>{selected&&<VideoModal item={selected} onClose={()=>setSelected(null)}/>}</section>
}

const certs = [
  { title:'Google Ads Search', meta:'Certificação · 2026–2027', img:'/assets/certificacoes/Google_Search.png' },
  { title:'Meta Digital Marketing Associate', meta:'Meta Certified', img:'/assets/certificacoes/meta-blueprint.png' },
  { title:'Growth Marketing Essential', meta:'Conversion Academy · 2024', img:'/assets/certificacoes/Growth_Certificado.png' },
  { title:'Inteligência Artificial para Marketing', meta:'Conversion Academy · 3h', img:'/assets/certificacoes/Inteligencia_Artificial_para_Marketing.png' },
  { title:'Métricas: coletar e analisar dados', meta:'Staage · 2025 · 2h', img:'/assets/certificacoes/Metricas_Boos_-_Coleta_e_analise_de_dados.png' },
  { title:'Tráfego para Negócios Locais', meta:'Staage · 2024 · 2h', img:'/assets/certificacoes/Trfego_para_Negcios_Locais_STAAGE_CLASS.png' },
  { title:'Masterclass Gestão de Marketing', meta:'V4 · conclusão', img:'/assets/certificacoes/Masterclass_Gesto_de_Marketing.png' },
]

function Authority() {
  const [active, setActive] = useState<typeof certs[number] | null>(null)
  return <section className="section authority" id="autoridade"><div className="container"><Reveal><SectionLabel number="09" title="Autoridade"/><div className="authority-heading"><div><h2>Conhecimento aplicado.<br /><span>Não apenas acumulado.</span></h2><p>Certificações e formações que sustentam as camadas de aquisição, dados, mídia, IA e crescimento da operação.</p></div><div className="authority-badge"><ShieldCheck size={18}/><span>FORMAÇÃO CONTÍNUA</span></div></div></Reveal><div className="cert-grid">{certs.map((cert,i)=><Reveal key={cert.title} delay={i*.04}><button className="cert-card" onClick={()=>setActive(cert)}><div className="cert-image"><img src={cert.img} alt={cert.title}/><span>AMPLIAR <ExternalLink size={12}/></span></div><div className="cert-meta"><b>{cert.title}</b><small>{cert.meta}</small></div></button></Reveal>)}</div></div>{active&&<div className="cert-modal" onClick={()=>setActive(null)}><div className="cert-modal-inner" onClick={e=>e.stopPropagation()}><button onClick={()=>setActive(null)} aria-label="Fechar"><X/></button><img src={active.img} alt={active.title}/><div><b>{active.title}</b><span>{active.meta}</span></div></div></div>}</section>
}

function FAQ() {
  const [open,setOpen]=useState<number|null>(null)
  const questions=['A 7UP é uma agência de tráfego?','Vocês trabalham apenas com marketing?','Vocês implementam CRM?','Vocês trabalham com automação e IA?','Vocês atuam junto ao comercial?','Como funciona o diagnóstico?','Para quais empresas a 7UP é indicada?']
  const answers=['Não. Aquisição é uma das camadas do nosso sistema. A 7UP conecta marketing, vendas e tecnologia para trabalhar a operação de receita como um todo.','Não. Atuamos na interseção entre aquisição, conversão, processos comerciais, CRM, automação, IA e inteligência.','Sim. CRM faz parte da arquitetura quando ele é necessário para organizar processo, dados e acompanhamento comercial.','Sim. Automação e SDR com IA podem integrar a operação quando fizerem sentido para o processo e o estágio da empresa.','Sim. O objetivo é conectar marketing e comercial para que a demanda gerada tenha continuidade até a receita.','Começamos entendendo a operação atual, identificando gargalos e priorizando as alavancas que podem ser estruturadas.','Empresas que já possuem operação comercial, investem em aquisição e querem integrar marketing, vendas e tecnologia com mais previsibilidade.']
  return <section className="section faq"><div className="container faq-grid"><Reveal><SectionLabel number="10" title="Perguntas"/><h2>Menos achismo.<br /><span>Mais clareza.</span></h2></Reveal><Reveal delay={.1}><div className="faq-list">{questions.map((q,i)=><div className={`faq-item ${open===i?'open':''}`} key={q}><button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{q}</span><ChevronDown size={19}/></button>{open===i&&<div className="faq-answer">{answers[i]}</div>}</div>)}</div></Reveal></div></section>
}

function FinalCTA() {
  return <section className="final-cta" id="contato"><div className="cta-glow"/><div className="container"><Reveal><Logo/><div className="cta-label">11 — PRÓXIMO MOVIMENTO</div><h2>Marketing, vendas e tecnologia<br /><span>não deveriam trabalhar separados.</span></h2><p>Descubra onde sua operação está vazando receita e quais alavancas devem ser priorizadas.</p><Button>FALAR COM A 7UP</Button></Reveal></div></section>
}

function Footer() {
  return <footer><div className="container footer-grid"><div><Logo/><p>7UP — Engenharia de Receita & Growth.</p></div><div className="footer-links">{nav.map(([label,id])=><a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-meta"><span>© {new Date().getFullYear()} 7UP Consultoria em Marketing</span><a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowRight size={13}/></a></div></div></footer>
}

function WhatsAppButton() { return <a className="wa-float" href={WA} target="_blank" rel="noopener noreferrer" aria-label="Falar com a 7UP pelo WhatsApp" title="Falar com a 7UP pelo WhatsApp"><MessageCircle size={23}/></a> }

export default function App() {
  return <><Navbar/><main><Hero/><BeliefBreak/><Positioning/><RevenueOS/><RevenueXRay/><ProcessTimeline/><Solutions/><IdealClient/><Proof/><Authority/><FAQ/><FinalCTA/></main><Footer/><WhatsAppButton/></>
}
