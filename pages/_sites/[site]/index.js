export async function getStaticPaths() {
  const paths = [{ params: { site: 'test' } }, { params: { site: 'test2' } }];

  return {
    paths: paths,
    fallback: 'blocking'
  };
}
