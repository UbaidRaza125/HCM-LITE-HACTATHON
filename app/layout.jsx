import './globals.css';

export const metadata = {
  title: 'HCM Lite — Human Capital, made clear',
  description: 'A focused human capital workspace for modern teams.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
