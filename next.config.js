const { withSentryConfig } = require("@sentry/nextjs");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const config = {
  output: "export",
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["reaflow"],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    config.experiments = { asyncWebAssembly: true, layers: true };

    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };

      // 优化：将 node_modules 中的依赖拆分为 vendors chunk
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
          },
        },
      };

      // 启用文件系统缓存，加速后续构建
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }

    return config;
  },
};

const configExport = () => {
  const baseConfig = {
    ...config,
    exportPathMap: async function () {
      return {
        "/": { page: "/" },
        "/editor": { page: "/editor" },
        "/widget": { page: "/widget" },
        "/docs": { page: "/docs" },
        "/404": { page: "/404" },
      };
    },
  };

  if (process.env.ANALYZE === "true") return withBundleAnalyzer(baseConfig);

  if (process.env.GITHUB_REPOSITORY === "AykutSarac/jsoncrack.com") {
    return withSentryConfig(
      baseConfig,
      {
        silent: true,
        org: "aykut-sarac",
        project: "json-crack",
      },
      {
        widenClientFileUpload: true,
        hideSourceMaps: true,
        disableLogger: true,
        disableServerWebpackPlugin: true,
      }
    );
  }

  return baseConfig;
};

module.exports = configExport();
