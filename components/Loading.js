const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

const Container = ({ children }) => (
  <div className="grid h-screen place-items-center">{children}</div>
);

const Spinner = () => (
  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400" />
);

export default Loading;
