import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  stages, themes, situations, cardGameQuestions,
  themeQuestions, situationQuestions,
  type ClosenessStage, type ThemeId, type SituationId,
} from '../data/questions';

// ── Storage ──
const STORAGE_KEY = 'talkmate-closer';

interface CloserState {
  selectedLevel: number;
  askedIds: Record<string, boolean>;
}

function loadState(): CloserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { selectedLevel: 1, askedIds: {} };
}

function saveState(state: CloserState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── Helpers ──
function getDaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function pickDaily(stage: ClosenessStage, count: number, asked: Record<string, boolean>): number[] {
  const unanswered = stage.questions.map((_, i) => i).filter((i) => !asked[`${stage.level}-${i}`]);
  if (unanswered.length === 0) return [];
  const seed = getDaySeed() + stage.level;
  const shuffled = [...unanswered].sort((a, b) => {
    const ha = ((a + seed) * 2654435761) >>> 0;
    const hb = ((b + seed) * 2654435761) >>> 0;
    return ha - hb;
  });
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ── Mode tabs ──
type Mode = 'stages' | 'themes' | 'situations' | 'cards';

const modeTabs: { id: Mode; label: string; emoji: string }[] = [
  { id: 'stages', label: '단계별', emoji: '📶' },
  { id: 'themes', label: '테마', emoji: '🎨' },
  { id: 'situations', label: '상황별', emoji: '🎭' },
  { id: 'cards', label: '카드뽑기', emoji: '🃏' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main Component
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Closer() {
  const [mode, setMode] = useState<Mode>('stages');
  const [state, setState] = useState<CloserState>(loadState);

  useEffect(() => { saveState(state); }, [state]);

  const toggleAsked = useCallback((key: string) => {
    setState((prev) => {
      const next = { ...prev, askedIds: { ...prev.askedIds } };
      if (next.askedIds[key]) delete next.askedIds[key];
      else next.askedIds[key] = true;
      return next;
    });
  }, []);

  const setLevel = useCallback((level: number) => {
    setState((prev) => ({ ...prev, selectedLevel: level }));
  }, []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">친해지기</h1>
        <p className="text-sm text-text-sub mt-1">질문 하나로 사이가 달라져요</p>
      </div>

      {/* Mode Tabs */}
      <div className="flex rounded-2xl overflow-hidden" style={{ backgroundColor: '#f1f5f9' }}>
        {modeTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`flex-1 py-2.5 text-xs font-semibold border-none cursor-pointer transition-all ${
              mode === tab.id
                ? 'bg-white text-text shadow-sm'
                : 'bg-transparent text-text-sub'
            }`}
            style={mode === tab.id ? { borderRadius: '14px', margin: '3px' } : { margin: '3px' }}
          >
            <span className="block text-sm mb-0.5">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {mode === 'stages' && (
        <StagesView state={state} setLevel={setLevel} toggleAsked={toggleAsked} />
      )}
      {mode === 'themes' && <ThemesView />}
      {mode === 'situations' && <SituationsView />}
      {mode === 'cards' && <CardGameView />}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1) Stages View (기존 단계별 — 리디자인)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StagesView({
  state, setLevel, toggleAsked,
}: {
  state: CloserState;
  setLevel: (l: number) => void;
  toggleAsked: (key: string) => void;
}) {
  const [viewMode, setViewMode] = useState<'daily' | 'all'>('daily');
  const currentStage = stages.find((s) => s.level === state.selectedLevel) ?? stages[0];

  const askedCount = useMemo(() => {
    return currentStage.questions.reduce(
      (acc, _, i) => acc + (state.askedIds[`${currentStage.level}-${i}`] ? 1 : 0), 0,
    );
  }, [state.askedIds, currentStage]);

  const dailyIndices = useMemo(
    () => pickDaily(currentStage, 3, state.askedIds),
    [currentStage, state.askedIds],
  );

  const allDone = askedCount === currentStage.questions.length;
  const pct = Math.round((askedCount / currentStage.questions.length) * 100);

  return (
    <div className="space-y-4">
      {/* Stage pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {stages.map((stage) => {
          const active = stage.level === state.selectedLevel;
          return (
            <button
              key={stage.level}
              onClick={() => { setLevel(stage.level); setViewMode('daily'); }}
              className="shrink-0 border-none cursor-pointer transition-all px-4 py-2.5 rounded-2xl"
              style={{
                background: active
                  ? `linear-gradient(135deg, ${stage.color}22, ${stage.color}44)`
                  : '#f8fafc',
                border: active ? `2px solid ${stage.color}` : '2px solid transparent',
              }}
            >
              <span className="text-lg block">{stage.emoji}</span>
              <span className="text-[11px] font-semibold block mt-0.5"
                style={{ color: active ? stage.color : '#64748b' }}
              >
                {stage.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress card */}
      <div
        className="rounded-2xl p-5 text-white relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${currentStage.color}, ${currentStage.color}cc)` }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20"
          style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
        <div className="relative">
          <p className="text-lg font-bold">{currentStage.emoji} {currentStage.title}</p>
          <p className="text-white/80 text-xs mt-0.5">{currentStage.subtitle}</p>
          <div className="mt-3 h-2 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${pct}%` }} />
          </div>
          <p className="text-white/80 text-xs mt-1.5">{askedCount}/{currentStage.questions.length} 완료 · {pct}%</p>
        </div>
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        {(['daily', 'all'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setViewMode(v)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all ${
              viewMode === v ? 'bg-text text-white' : 'bg-border text-text-sub'
            }`}
          >
            {v === 'daily' ? '오늘의 질문' : '전체 보기'}
          </button>
        ))}
      </div>

      {/* Questions */}
      {viewMode === 'daily' ? (
        <div className="space-y-3">
          {allDone ? (
            <CompleteBanner
              stage={currentStage}
              onNext={currentStage.level < 5 ? () => setLevel(currentStage.level + 1) : undefined}
            />
          ) : dailyIndices.length === 0 ? (
            <div className="bg-surface rounded-2xl p-8 text-center">
              <p className="text-2xl mb-2">✨</p>
              <p className="text-sm font-semibold text-text">오늘 질문 완료!</p>
              <p className="text-xs text-text-sub mt-1">내일 새 질문이 나타나요</p>
            </div>
          ) : (
            dailyIndices.map((qIdx, i) => (
              <GlassCard
                key={qIdx}
                question={currentStage.questions[qIdx]}
                asked={!!state.askedIds[`${currentStage.level}-${qIdx}`]}
                color={currentStage.color}
                number={i + 1}
                onToggle={() => toggleAsked(`${currentStage.level}-${qIdx}`)}
              />
            ))
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {currentStage.questions.map((q, i) => {
            const asked = !!state.askedIds[`${currentStage.level}-${i}`];
            return (
              <button
                key={i}
                onClick={() => toggleAsked(`${currentStage.level}-${i}`)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border-none cursor-pointer transition-all ${
                  asked ? 'bg-border' : 'bg-surface'
                }`}
              >
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all"
                  style={asked
                    ? { backgroundColor: currentStage.color, color: 'white' }
                    : { backgroundColor: '#f1f5f9', color: '#94a3b8' }
                  }
                >
                  {asked ? '✓' : i + 1}
                </span>
                <span className={`text-sm ${asked ? 'text-text-sub line-through' : 'text-text'}`}>{q}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2) Themes View
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ThemesView() {
  const [selected, setSelected] = useState<ThemeId | null>(null);

  if (selected) {
    const theme = themes.find((t) => t.id === selected)!;
    const questions = themeQuestions[selected];
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="text-sm text-text-sub bg-transparent border-none cursor-pointer px-0"
        >
          ← 테마 목록
        </button>
        <div className="rounded-2xl p-5 text-white"
          style={{ background: `linear-gradient(135deg, ${theme.color}, ${theme.color}bb)` }}>
          <p className="text-2xl">{theme.emoji}</p>
          <p className="text-lg font-bold mt-1">{theme.name}</p>
          <p className="text-white/70 text-xs mt-0.5">{questions.length}개 질문</p>
        </div>
        <div className="space-y-2">
          {questions.map((q, i) => (
            <div key={i} className="bg-surface rounded-xl px-4 py-3.5 flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: theme.color }}>{i + 1}</span>
              <span className="text-sm text-text leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-sub">관심사로 골라보세요</p>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelected(theme.id)}
            className="text-left rounded-2xl p-5 border-none cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: `linear-gradient(145deg, ${theme.color}15, ${theme.color}30)` }}
          >
            <span className="text-2xl block">{theme.emoji}</span>
            <p className="text-sm font-bold mt-2" style={{ color: theme.color }}>{theme.name}</p>
            <p className="text-[11px] text-text-sub mt-0.5">
              {themeQuestions[theme.id].length}개 질문
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3) Situations View
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SituationsView() {
  const [selected, setSelected] = useState<SituationId | null>(null);

  if (selected) {
    const sit = situations.find((s) => s.id === selected)!;
    const questions = situationQuestions[selected];
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelected(null)}
          className="text-sm text-text-sub bg-transparent border-none cursor-pointer px-0"
        >
          ← 상황 목록
        </button>
        <div className="rounded-2xl p-5 text-white"
          style={{ background: `linear-gradient(135deg, ${sit.color}, ${sit.color}bb)` }}>
          <p className="text-2xl">{sit.emoji}</p>
          <p className="text-lg font-bold mt-1">{sit.name}</p>
          <p className="text-white/70 text-xs mt-0.5">{sit.description}</p>
        </div>
        <div className="space-y-2">
          {questions.map((q, i) => (
            <div key={i} className="bg-surface rounded-xl px-4 py-3.5 flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ backgroundColor: sit.color }}>{i + 1}</span>
              <span className="text-sm text-text leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-sub">누구와 대화하나요?</p>
      {situations.map((sit) => (
        <button
          key={sit.id}
          onClick={() => setSelected(sit.id)}
          className="w-full text-left rounded-2xl p-5 border-none cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-4"
          style={{ background: `linear-gradient(135deg, ${sit.color}10, ${sit.color}25)` }}
        >
          <span className="text-3xl">{sit.emoji}</span>
          <div>
            <p className="text-[15px] font-bold" style={{ color: sit.color }}>{sit.name}</p>
            <p className="text-xs text-text-sub mt-0.5">{sit.description}</p>
            <p className="text-[11px] mt-1" style={{ color: sit.color }}>
              {situationQuestions[sit.id].length}개 질문 →
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4) Card Game View
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CardGameView() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());

  const deck = cardGameQuestions.find((d) => d.level === selectedLevel) ?? cardGameQuestions[0];

  const drawNext = useCallback(() => {
    setFlipped(false);
    setTimeout(() => {
      const available = deck.questions
        .map((_, i) => i)
        .filter((i) => !usedIndices.has(i) && i !== currentIndex);
      if (available.length === 0) {
        setUsedIndices(new Set());
        setCurrentIndex(Math.floor(Math.random() * deck.questions.length));
      } else {
        const next = available[Math.floor(Math.random() * available.length)];
        setUsedIndices((prev) => new Set(prev).add(currentIndex));
        setCurrentIndex(next);
      }
    }, 200);
  }, [deck, currentIndex, usedIndices]);

  const resetDeck = useCallback(() => {
    setFlipped(false);
    setUsedIndices(new Set());
    setCurrentIndex(Math.floor(Math.random() * deck.questions.length));
  }, [deck]);

  // Reset on level change
  useEffect(() => {
    resetDeck();
  }, [selectedLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  const remaining = deck.questions.length - usedIndices.size;

  return (
    <div className="space-y-5">
      {/* Level selector */}
      <div className="flex gap-2">
        {cardGameQuestions.map((d) => (
          <button
            key={d.level}
            onClick={() => setSelectedLevel(d.level)}
            className={`flex-1 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold`}
            style={{
              borderColor: selectedLevel === d.level ? d.color : '#e2e8f0',
              backgroundColor: selectedLevel === d.level ? `${d.color}15` : 'white',
              color: selectedLevel === d.level ? d.color : '#94a3b8',
            }}
          >
            {d.emoji} {d.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="flex justify-center">
        <div
          onClick={() => !flipped && setFlipped(true)}
          className="w-full max-w-xs cursor-pointer select-none"
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              height: '280px',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center"
              style={{
                backfaceVisibility: 'hidden',
                background: `linear-gradient(145deg, ${deck.color}, ${deck.color}cc)`,
                boxShadow: `0 8px 32px ${deck.color}40`,
              }}
            >
              <span className="text-5xl mb-4">🃏</span>
              <p className="text-white font-bold text-lg">탭하여 뒤집기</p>
              <p className="text-white/60 text-xs mt-1">남은 카드 {remaining}장</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center px-8 text-center"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'white',
                boxShadow: `0 8px 32px ${deck.color}25`,
                border: `3px solid ${deck.color}30`,
              }}
            >
              <span className="text-3xl mb-4">{deck.emoji}</span>
              <p className="text-text text-lg font-semibold leading-snug">
                {deck.questions[currentIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={drawNext}
          className="flex-1 py-3.5 rounded-xl text-sm font-semibold border-none cursor-pointer text-white transition-all active:scale-[0.97]"
          style={{ backgroundColor: deck.color }}
        >
          다음 카드 →
        </button>
        <button
          onClick={resetDeck}
          className="py-3.5 px-4 rounded-xl text-sm font-semibold border-none cursor-pointer bg-border text-text-sub transition-all active:scale-[0.97]"
        >
          초기화
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-[11px] text-text-sub">
        둘이서 번갈아가며 뽑아보세요!
      </p>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared Components
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function GlassCard({
  question, asked, color, number, onToggle,
}: {
  question: string; asked: boolean; color: string; number: number; onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-5 transition-all"
      style={{
        background: asked ? '#f8fafc' : `linear-gradient(145deg, ${color}08, ${color}15)`,
        border: `1.5px solid ${asked ? '#e2e8f0' : color + '30'}`,
        opacity: asked ? 0.6 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: color }}>
          {number}
        </span>
        <div className="flex-1">
          <p className={`text-[15px] leading-relaxed ${asked ? 'text-text-sub line-through' : 'text-text'}`}>
            {question}
          </p>
          <button
            onClick={onToggle}
            className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold border-none cursor-pointer transition-all active:scale-[0.95]"
            style={!asked
              ? { backgroundColor: color, color: 'white' }
              : { backgroundColor: '#f1f5f9', color: '#94a3b8' }
            }
          >
            {asked ? '↩ 되돌리기' : '✓ 물어봤어요!'}
          </button>
        </div>
      </div>
    </div>
  );
}

function CompleteBanner({
  stage, onNext,
}: {
  stage: ClosenessStage; onNext?: () => void;
}) {
  return (
    <div className="rounded-2xl p-8 text-center text-white"
      style={{ background: `linear-gradient(135deg, ${stage.color}, ${stage.color}aa)` }}>
      <p className="text-4xl mb-3">🎉</p>
      <p className="text-lg font-bold">이 단계 완료!</p>
      <p className="text-white/70 text-sm mt-1">대단해요, 한 단계 더 가까워졌어요</p>
      {onNext && (
        <button
          onClick={onNext}
          className="mt-4 px-6 py-3 bg-white rounded-xl text-sm font-bold border-none cursor-pointer transition-all active:scale-[0.95]"
          style={{ color: stage.color }}
        >
          다음 단계로 →
        </button>
      )}
    </div>
  );
}
