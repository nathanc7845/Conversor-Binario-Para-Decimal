 const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                tabs.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
                document.getElementById('resultadoDecimalToBin').textContent = '---';
                document.getElementById('resultadoBinToDecimal').textContent = '---';
                document.getElementById('decimalInput').value = '';
                document.getElementById('binarioInput').value = '';
            });
        });

        const decimalInput = document.getElementById('decimalInput');
        const btnDecimalToBin = document.getElementById('btnDecimalToBin');
        const resultadoDecimalToBin = document.getElementById('resultadoDecimalToBin');

        btnDecimalToBin.addEventListener('click', () => {
            let num = parseInt(decimalInput.value);
            if (isNaN(num) || num < 0) {
                resultadoDecimalToBin.innerHTML = '<span class="erro">Digite um número decimal válido &ge; 0.</span>';
                return;
            }

            let potencia = 1;
            while (potencia <= num) {
                potencia *= 2;
            }
            potencia /= 2;

            let bin = '';
            let resto = num;

            while (potencia >= 1) {
                if (resto >= potencia) {
                    resto -= potencia;
                    bin += '1';
                } else {
                    bin += '0';
                }
                potencia /= 2;
            }

            bin = bin.replace(/^0+/, '') || '0';

            resultadoDecimalToBin.textContent = `Binário: ${bin}`;
        });

        const binarioInput = document.getElementById('binarioInput');
        const btnBinToDecimal = document.getElementById('btnBinToDecimal');
        const resultadoBinToDecimal = document.getElementById('resultadoBinToDecimal');

        btnBinToDecimal.addEventListener('click', () => {
            const bin = binarioInput.value.trim();

            if (!/^[01]+$/.test(bin)) {
                resultadoBinToDecimal.innerHTML = '<span class="erro">Digite apenas 0 e 1.</span>';
                return;
            }

            let decimal = 0;
            for (let i = 0; i < bin.length; i++) {
                const bit = parseInt(bin[i]);
                const expoente = bin.length - i - 1;
                decimal += bit * Math.pow(2, expoente);
            }

            resultadoBinToDecimal.textContent = `Decimal: ${decimal}`;
        });