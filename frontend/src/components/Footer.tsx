import { AppBar } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        marginTop: '20px',
        padding: '20px 8px 8px',
        borderTop: '1px solid #e0e0e0',
        boxShadow: 'none',
        backgroundColor: '#f6f6f6',
      }}
    >
      <div className="container">
        <b>Author</b>
        <ul>
          <li>Christopher Ivan Gunardi (18119025)</li>
          <li>Amadea Rashida (18119017)</li>
        </ul>
        <b>Citation</b>
        <ul>
          <li>
            Mengting Wan, Julian McAuley,{' '}
            <a href="https://www.google.com/url?q=https%3A%2F%2Fgithub.com%2FMengtingWan%2Fmengtingwan.github.io%2Fraw%2Fmaster%2Fpaper%2Frecsys18_mwan.pdf&sa=D&sntz=1&usg=AOvVaw0HcX6gU1ENhk7fbCXXbCiy">
              &quot;Item Recommendation on Monotonic Behavior Chains&quot;
            </a>
            , in RecSys&rsquo;18.
          </li>
          <li>
            Mengting Wan, Rishabh Misra, Ndapa Nakashole, Julian McAuley,{' '}
            <a href="https://www.google.com/url?q=https%3A%2F%2Fwww.aclweb.org%2Fanthology%2FP19-1248&sa=D&sntz=1&usg=AOvVaw1G1ZlQ7oe0NDtqeI8gN2Nf">
              &quot;Item Recommendation on Monotonic Behavior Chains&quot;
            </a>
            , in ACL&rsquo;19.
          </li>
        </ul>
      </div>
    </AppBar>
  );
};

export default Navbar;
