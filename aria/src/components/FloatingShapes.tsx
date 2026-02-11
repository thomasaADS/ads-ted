export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Floating circles */}
      <div
        className="absolute w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float"
        style={{
          top: '10%',
          left: '10%',
          animationDuration: '8s',
          animationDelay: '0s',
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float"
        style={{
          top: '40%',
          right: '10%',
          animationDuration: '10s',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float"
        style={{
          bottom: '10%',
          left: '20%',
          animationDuration: '12s',
          animationDelay: '1s',
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float"
        style={{
          top: '60%',
          right: '30%',
          animationDuration: '9s',
          animationDelay: '3s',
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 animate-pulse-slow"
        style={{
          top: '20%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
          animationDuration: '6s',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-30 animate-pulse-slow"
        style={{
          bottom: '15%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.1) 0%, transparent 70%)',
          animationDuration: '7s',
          animationDelay: '2s',
        }}
      />
    </div>
  );
};
