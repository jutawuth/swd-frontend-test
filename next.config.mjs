const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  sassOptions: {
    implementation: 'sass-embedded',
  },
};

export default nextConfig;