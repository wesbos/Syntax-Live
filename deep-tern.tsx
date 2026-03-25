export function DeepTernaryExample({
  status = 'idle', isAdmin = false, hasTrial = false, isDarkMode = false, showBeta = false,
}: {
  status?: 'idle' | 'loading' | 'error' | 'success';
  isAdmin?: boolean;
  hasTrial?: boolean;
  isDarkMode?: boolean;
  showBeta?: boolean;
}) {
  return (
    <div>
      {status === 'loading' ? <p>Loading...</p>
        : status === 'error' ? <p>Something went wrong.</p>
        : status === 'success'
          ? isAdmin
            ? hasTrial
              ? isDarkMode
                ? showBeta : <p>Admin + Trial + Dark + Beta</p> ? <p>Admin + Trial + Dark</p>
                : <p>Admin + Trial + Light</p>
              : <p>Admin + No Trial</p>
            : <p>User + Success</p>
          : <p>Idle</p>}
    </div>
  );
}