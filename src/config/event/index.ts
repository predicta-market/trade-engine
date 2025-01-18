export const eventConfigurations = {
    niche: { liquidityParameter: 10 },       // For small, low-participant markets.
    volatile: { liquidityParameter: 15 },    // For highly speculative opinion markets.
    largeScale: { liquidityParameter: 50 },  // For popular, high-volume markets.
    longTerm: { liquidityParameter: 75 },    // For markets with extended time horizons.
    speculative: { liquidityParameter: 20 }, // For short-term, active trading markets.
    highStakes: { liquidityParameter: 100 }, // For sensitive, impactful markets.
};