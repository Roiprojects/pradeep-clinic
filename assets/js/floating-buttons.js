/* 
   Floating Action Buttons Logic - Dr Pradeep Clinic 
   - Robust Call Modal with Inline Styles (No external CSS dependency)
   - Site-wide 'tel:' interceptor
*/

(function() {
    function init() {
        // --- Scroll to Top Logic ---
        const scrollTopBtn = document.querySelector('.btn-scroll-top');
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('visible');
                    scrollTopBtn.style.opacity = '1';
                    scrollTopBtn.style.visibility = 'visible';
                    scrollTopBtn.style.transform = 'translateY(0)';
                } else {
                    scrollTopBtn.classList.remove('visible');
                    scrollTopBtn.style.opacity = '0';
                    scrollTopBtn.style.visibility = 'hidden';
                    scrollTopBtn.style.transform = 'translateY(20px)';
                }
            });

            scrollTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // --- Standardized Call Modal Logic ---
        injectCallModal();
        attachCallButtonListeners();
        console.log("Dr Pradeep Clinic Floating Buttons v1.1 - Robust & Balanced.");
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function injectCallModal() {
        if (document.getElementById('callModal')) return;

        const modalHTML = `
        <div id="callModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 100000; align-items: center; justify-content: center; padding: 16px; opacity: 0; transition: opacity 0.3s ease;">
            <div style="background: white; border-radius: 40px; padding: 32px; max-width: 380px; width: 100%; position: relative; transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <button onclick="closeCallModal()" style="position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; color: #94a3b8; font-size: 24px; display: flex; align-items: center; justify-content: center;">
                    <span class="material-symbols-outlined" style="font-weight: 200;">close</span>
                </button>
                
                <h3 style="margin: 0 0 12px 0; font-size: 24px; font-weight: 800; color: #002443; text-transform: uppercase; letter-spacing: -0.02em; font-family: 'Playfair Display', serif;">Connect With Us</h3>
                <p style="margin: 0 0 32px 0; color: #64748b; font-weight: 500; font-size: 15px; line-height: 1.5;">Please select a preferred number to call the clinic.</p>
                
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- Primary Mobile -->
                    <a href="tel:9187606838" style="display: flex; align-items: center; justify-content: space-between; padding: 20px; border-radius: 24px; background: #FFF5F7; border: 1px solid rgba(255,108,136,0.05); text-decoration: none; transition: all 0.2s ease;" onmouseover="this.style.background='#FEEBF0'" onmouseout="this.style.background='#FFF5F7'">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="width: 48px; height: 48px; border-radius: 16px; background: white; display: flex; align-items: center; justify-content: center; color: #ff6c88; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                                <span class="material-symbols-outlined">smartphone</span>
                            </div>
                            <div>
                                <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1;">Primary Mobile</p>
                                <p style="margin: 0; font-size: 18px; font-weight: 800; color: #002443; letter-spacing: -0.01em;">9187606838</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined" style="color: #cbd5e1; font-weight: 200;">call</span>
                    </a>

                    <!-- Clinic Landline -->
                    <a href="tel:08046971142" style="display: flex; align-items: center; justify-content: space-between; padding: 20px; border-radius: 24px; background: #F0F7FF; border: 1px solid rgba(0,94,161,0.05); text-decoration: none; transition: all 0.2s ease;" onmouseover="this.style.background='#E1F0FF'" onmouseout="this.style.background='#F0F7FF'">
                        <div style="display: flex; align-items: center; gap: 16px;">
                            <div style="width: 48px; height: 48px; border-radius: 16px; background: white; display: flex; align-items: center; justify-content: center; color: #005ea1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                                <span class="material-symbols-outlined">phone_in_talk</span>
                            </div>
                            <div>
                                <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1;">Clinic Landline</p>
                                <p style="margin: 0; font-size: 18px; font-weight: 800; color: #002443; letter-spacing: -0.01em;">08046971142</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined" style="color: #cbd5e1; font-weight: 200;">call</span>
                    </a>
                </div>
                
                <p style="margin: 40px 0 0 0; text-align: center; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.2em; opacity: 0.8;">24/7 Clinical Support</p>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Close on outside click
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('callModal');
            if (event.target === modal) {
                closeCallModal();
            }
        });
    }

    function attachCallButtonListeners() {
        const callButtons = document.querySelectorAll('.btn-call');
        callButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.openCallModal();
            });
        });

        document.addEventListener('click', (e) => {
            const telLink = e.target.closest('a[href^="tel:"]');
            if (telLink && !telLink.closest('#callModal')) {
                e.preventDefault();
                window.openCallModal();
            }
        });
    }

    window.openCallModal = function(e) {
        if (e) e.preventDefault();
        const modal = document.getElementById('callModal');
        if (!modal) return;
        
        const card = modal.querySelector('div');
        modal.style.display = 'flex';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 10);
    };

    window.closeCallModal = function() {
        const modal = document.getElementById('callModal');
        if (!modal) return;
        
        const card = modal.querySelector('div');
        modal.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };
})();
