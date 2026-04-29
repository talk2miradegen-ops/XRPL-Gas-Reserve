// ─── Falling XRP Coins Background ───
function createCoinRain() {
    const container = document.createElement('div');
    container.className = 'coin-rain';
    document.body.appendChild(container);

    function spawnCoin() {
        const coin = document.createElement('img');
        coin.src = 'images/xrplogo.png';
        coin.className = 'falling-coin';

        const size = Math.random() * 20 + 12; // 12-32px
        const startX = Math.random() * 100;
        const duration = Math.random() * 12 + 10; // 10-22s
        const delay = Math.random() * 2;
        const drift = (Math.random() - 0.5) * 80; // horizontal sway

        coin.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            --drift: ${drift}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.12 + 0.03};
        `;

        container.appendChild(coin);

        // Remove after animation ends
        setTimeout(() => {
            coin.remove();
        }, (duration + delay) * 1000);
    }

    // Spawn initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(() => spawnCoin(), i * 600);
    }

    // Keep spawning
    setInterval(spawnCoin, 2500);
}

// Initialize coin rain on load
document.addEventListener('DOMContentLoaded', createCoinRain);

// Smooth scroll to sections
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Sample claims data - will be replaced with real backend data
const sampleClaims = [
    { wallet: 'r9KHe5Q...', type: 'xrp', amount: 45500, initials: 'KH', time: '2s ago', hash: '5B2F...A1E9' },
    { wallet: 'rJ4Md8m...', type: 'nft', amount: 'XRPL Punk #842', initials: 'JM', time: '12s ago', hash: '8C1A...B2D4' },
    { wallet: 'rXpDkFp...', type: 'xrp', amount: 52100, initials: 'XP', time: '45s ago', hash: '2E4D...F6G8' },
    { wallet: 'rGcEt9M...', type: 'nft', amount: 'Exclusive Pass', initials: 'GM', time: '1m ago', hash: '9H3J...K5L7' },
    { wallet: 'rBvKpT2...', type: 'xrp', amount: 75300, initials: 'BP', time: '3m ago', hash: '1M4N...P6Q8' },
    { wallet: 'rF5nTx8...', type: 'xrp', amount: 3700, initials: 'FT', time: '5m ago', hash: '4R7S...T9U1' },
    { wallet: 'rH2PqWm...', type: 'nft', amount: 'XRP Ape #102', initials: 'HP', time: '8m ago', hash: '7V0W...X2Y4' },
];

// Initialize live claims ticker
function initializeClaimsTicker() {
    const ticker = document.getElementById('claimsTicker');
    if (!ticker) return;

    // Display initial claims
    sampleClaims.forEach(claim => {
        addClaimToTicker(claim);
    });

    // Add new random claims periodically (simulated)
    setInterval(() => {
        const isNFT = Math.random() > 0.7; // 30% chance for NFT
        const nftNames = ['XRPL Punk', 'Exclusive Pass', 'XRP Ape', 'Genesis Drop', 'Founder Badge'];
        
        const randomClaim = {
            wallet: 'r' + Math.random().toString(36).substring(2, 6).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase() + '...',
            type: isNFT ? 'nft' : 'xrp',
            amount: isNFT 
                ? `${nftNames[Math.floor(Math.random() * nftNames.length)]} #${Math.floor(Math.random() * 9999)}`
                : Math.floor(Math.pow(Math.random(), 3) * (90000 - 30) + 30),
            initials: String.fromCharCode(65 + Math.random() * 25) + String.fromCharCode(65 + Math.random() * 25),
            time: 'just now',
            hash: Math.random().toString(16).substring(2, 6).toUpperCase() + '...' + Math.random().toString(16).substring(2, 6).toUpperCase()
        };
        addClaimToTicker(randomClaim, true);
    }, 8000); // Add new claim every 8 seconds for more "live" feel
}

function addClaimToTicker(claim, prepend = false) {
    const ticker = document.getElementById('claimsTicker');
    if (!ticker) return;

    const claimElement = document.createElement('div');
    claimElement.className = 'claim-item';
    
    const displayAmount = claim.type === 'nft' 
        ? `🎁 ${claim.amount}`
        : `+${claim.amount.toLocaleString()} XRP`;

    const badgeColor = claim.type === 'nft' ? '#a855f7' : '#22c55e'; // Purple for NFT, Green for XRP

    claimElement.innerHTML = `
        <div class="claim-avatar" style="${claim.type === 'nft' ? 'background: linear-gradient(135deg, #a855f7, #6b21a8);' : ''}">${claim.initials}</div>
        <div class="claim-details">
            <h4>${claim.wallet}</h4>
            <span class="claim-hash">${claim.hash || claim.time}</span>
        </div>
        <div>
            <div class="claim-amount" style="${claim.type === 'nft' ? 'color: #c084fc;' : ''}">${displayAmount}</div>
            <span class="claim-badge" style="color: ${badgeColor}; border-color: ${badgeColor}40; background: ${badgeColor}15;">VERIFIED</span>
        </div>
    `;

    if (prepend && ticker.firstChild) {
        claimElement.style.opacity = '0';
        claimElement.style.transform = 'translateY(-10px)';
        ticker.insertBefore(claimElement, ticker.firstChild);
        // Animate in
        requestAnimationFrame(() => {
            claimElement.style.transition = 'all 0.4s ease';
            claimElement.style.opacity = '1';
            claimElement.style.transform = 'translateY(0)';
        });
        // Remove oldest item if there are too many
        if (ticker.children.length > 10) {
            ticker.removeChild(ticker.lastChild);
        }
    } else {
        ticker.appendChild(claimElement);
    }
}

// Handle claim form submission - placeholder for senior dev
document.getElementById('claimForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Senior dev will implement claim logic here
});

// Mobile menu interaction
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const sectionId = this.getAttribute('href').substring(1);
        scrollTo(sectionId);
    });
});

// Add active state to navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-color)';
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe xaman features
document.querySelectorAll('.xaman-feature').forEach(feature => {
    feature.style.opacity = '0';
    observer.observe(feature);
});

// Observe pools section
const poolsCard = document.querySelector('.pools-card');
if (poolsCard) {
    poolsCard.style.opacity = '0';
    observer.observe(poolsCard);
}

// Observe pool features
document.querySelectorAll('.pool-feature').forEach(feature => {
    feature.style.opacity = '0';
    observer.observe(feature);
});

// Observe claim section
const claimFormWrapper = document.querySelector('.claim-form-wrapper');
if (claimFormWrapper) {
    claimFormWrapper.style.opacity = '0';
    observer.observe(claimFormWrapper);
}

// Parallax effect on mouse move for hero section
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.animated-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const moveX = (x - 0.5) * (index + 1) * 20;
        const moveY = (y - 0.5) * (index + 1) * 20;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Curated XRPL tokens for fallback when API is unavailable
const fallbackTokens = [
    { symbol: 'xrp', name: 'XRP', current_price: 0.62, market_cap: 34000000000, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
    { symbol: 'solo', name: 'Sologenic', current_price: 0.15, market_cap: 60000000, image: 'https://assets.coingecko.com/coins/images/10290/large/solo.png' },
    { symbol: 'csc', name: 'CasinoCoin', current_price: 0.0004, market_cap: 25000000, image: 'https://assets.coingecko.com/coins/images/1284/large/casinocoin.png' },
    { symbol: 'coreum', name: 'Coreum', current_price: 0.12, market_cap: 150000000, image: 'https://assets.coingecko.com/coins/images/27908/large/Coreum_Logo_200x200.png' },
    { symbol: 'els', name: 'Elysian', current_price: 0.008, market_cap: 5000000, image: 'https://assets.coingecko.com/coins/images/17150/large/elysian.png' },
    { symbol: 'xcore', name: 'xCORE', current_price: 0.05, market_cap: 12000000, image: 'https://assets.coingecko.com/coins/images/30349/large/xcore.png' },
    { symbol: 'xmagnetic', name: 'xMagnetic', current_price: 0.85, market_cap: 8000000, image: 'https://assets.coingecko.com/coins/images/28414/large/xmagnetic.png' },
    { symbol: 'ctsi', name: 'Cartesi', current_price: 0.22, market_cap: 180000000, image: 'https://assets.coingecko.com/coins/images/11038/large/cartesi.png' }
];

let allTokens = [];
let currentPage = 1;
const tokensPerPage = 12;

// Fetch tokens from DexScreener
async function fetchTokens() {
    const container = document.getElementById('tokensContainer');
    if (!container) return;

    try {
        const response = await fetch('https://api.dexscreener.com/latest/dex/search?q=xrpl', {
            signal: AbortSignal.timeout(10000)
        });
        
        if (!response.ok) throw new Error('DexScreener unavailable');

        const data = await response.json();
        if (!data.pairs || data.pairs.length === 0) throw new Error('No pairs found');

        const seenSymbols = new Set();
        allTokens = data.pairs
            .filter(pair => {
                if (seenSymbols.has(pair.baseToken.symbol)) return false;
                seenSymbols.add(pair.baseToken.symbol);
                return true;
            })
            .map(pair => ({
                symbol: pair.baseToken.symbol,
                name: pair.baseToken.name,
                current_price: parseFloat(pair.priceUsd),
                market_cap: pair.fdv || 0,
                image: pair.info && pair.info.imageUrl ? pair.info.imageUrl : '',
                isLive: true
            }));

        currentPage = 1;
        renderTokensPage();

    } catch (error) {
        console.warn('DexScreener fetch failed, using fallback tokens:', error);
        allTokens = fallbackTokens.map(t => ({ ...t, isLive: false }));
        currentPage = 1;
        renderTokensPage();
    }
}

function renderTokensPage() {
    const start = (currentPage - 1) * tokensPerPage;
    const end = start + tokensPerPage;
    const tokensToShow = allTokens.slice(start, end);
    
    renderTokens(tokensToShow, allTokens[0]?.isLive || false);
    renderPaginationControls();
}

function renderPaginationControls() {
    const controls = document.getElementById('paginationControls');
    if (!controls) return;

    const totalPages = Math.ceil(allTokens.length / tokensPerPage);
    if (totalPages <= 1) {
        controls.innerHTML = '';
        return;
    }

    let html = '';
    
    // Prev Button
    html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Prev</button>`;

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<span class="pagination-dots">...</span>`;
        }
    }

    // Next Button
    html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>`;

    controls.innerHTML = html;
}

function changePage(page) {
    currentPage = page;
    renderTokensPage();
    document.getElementById('pools').scrollIntoView({ behavior: 'smooth' });
}

function renderTokens(tokens, isLive) {
    const container = document.getElementById('tokensContainer');
    if (!container) return;

    container.innerHTML = '';
    
    tokens.forEach(token => {
        const initials = token.symbol.substring(0, 2).toUpperCase();
        const tokenCard = document.createElement('div');
        tokenCard.className = 'token-card';
        tokenCard.innerHTML = `
            <div class="token-header">
                <div class="token-icon">
                    <img src="${token.image}" alt="${token.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="token-icon-fallback" style="display: none;">${initials}</div>
                </div>
                <div class="token-info">
                    <h3>${token.symbol.toUpperCase()} ${isLive ? '<span class="live-indicator">● DEX</span>' : ''}</h3>
                    <p>${token.name}</p>
                </div>
            </div>
            <div class="token-details">
                <div class="token-detail-item">
                    <div class="token-detail-label">Price</div>
                    <div class="token-detail-value">$${token.current_price ? token.current_price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: token.current_price < 1 ? 6 : 2}) : 'N/A'}</div>
                </div>
                <div class="token-detail-item">
                    <div class="token-detail-label">Market Cap</div>
                    <div class="token-detail-value">${token.market_cap ? '$' + formatMarketCap(token.market_cap) : 'N/A'}</div>
                </div>
            </div>
            <div class="token-action">
                <button class="token-btn" onclick="window.open('https://firstledger.net/pools-v2', '_blank')">Trade</button>
            </div>
        `;
        container.appendChild(tokenCard);
    });
}

function formatMarketCap(value) {
    if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    return value.toLocaleString();
}

// Initialize on page load
window.addEventListener('load', function() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });

    // Initialize live claims ticker
    initializeClaimsTicker();
    initializeNewsFeed();
    updateLedgerIndex();

    // Fetch tokens from API
    fetchTokens();
});

// Simulated XRP News
const xrpNews = [
    { tag: 'Regulatory', title: 'Major progress in XRPL international payments framework', time: '5m ago', source: 'Ripple Insights' },
    { tag: 'Technical', title: 'New AMM implementation boosts liquidity across XRPL DEX', time: '12m ago', source: 'XRPL Org' },
    { tag: 'Market', title: 'XRP institutional adoption reaches new quarterly high', time: '24m ago', source: 'CoinDesk' },
    { tag: 'Partnership', title: 'Top tier bank integrates XRPL for cross-border settlements', time: '45m ago', source: 'Financial Times' },
    { tag: 'Ecosystem', title: 'NFT volume on XRPL surges 40% following protocol update', time: '1h ago', source: 'The Block' }
];

function initializeNewsFeed() {
    const feed = document.getElementById('newsFeed');
    if (!feed) return;

    feed.innerHTML = '';
    xrpNews.forEach(news => {
        const item = document.createElement('div');
        item.className = 'news-item';
        item.innerHTML = `
            <span class="news-tag">${news.tag}</span>
            <h4>${news.title}</h4>
            <div class="news-meta">
                <span>${news.source}</span>
                <span>${news.time}</span>
            </div>
        `;
        feed.appendChild(item);
    });

    // Add new items occasionally
    setInterval(() => {
        const randomNews = xrpNews[Math.floor(Math.random() * xrpNews.length)];
        const newItem = document.createElement('div');
        newItem.className = 'news-item';
        newItem.style.opacity = '0';
        newItem.style.transform = 'translateY(20px)';
        newItem.innerHTML = `
            <span class="news-tag">BREAKING</span>
            <h4>${randomNews.title}</h4>
            <div class="news-meta">
                <span>Network Node</span>
                <span>Just Now</span>
            </div>
        `;
        
        feed.prepend(newItem);
        if (feed.children.length > 8) feed.lastElementChild.remove();

        setTimeout(() => {
            newItem.style.transition = 'all 0.5s ease';
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
        }, 100);
    }, 15000);
}

function updateLedgerIndex() {
    const ledgerEl = document.getElementById('ledgerIndex');
    if (!ledgerEl) return;

    let currentIndex = 86452100 + Math.floor(Math.random() * 1000);
    
    setInterval(() => {
        currentIndex += Math.floor(Math.random() * 3) + 1;
        ledgerEl.textContent = currentIndex.toLocaleString();
        ledgerEl.style.color = '#fff';
        setTimeout(() => ledgerEl.style.color = 'var(--text-muted)', 500);
    }, 4000);
}

// Console welcome message
console.log('%c🟢 XRPL Gas Reserve - Earn Up To 700M XRP', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cPowered by Xaman | Instant | Secure', 'font-size: 14px; color: #fbbf24; font-weight: bold;');
console.log('%cClaim your share of the gas reserve today!', 'font-size: 12px; color: #e0e0e0;');
