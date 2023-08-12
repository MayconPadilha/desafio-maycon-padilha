class CaixaDaLanchonete {
    
    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        const descontoDinheiro = 0.05; // 5%
        const acrescimoCredito = 0.03; // 3%

        let valorTotal = 0;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (cardapio[codigo]) {
                valorTotal += cardapio[codigo] * parseInt(quantidade);
            } else {
                return 'Item inválido!';
            }
        }

        if(metodoDePagamento === null){
            return "Não há itens no carrinho de compra!";
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= (1 - descontoDinheiro); // Aplica desconto de 5% no valor 
            return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= (1 + acrescimoCredito); // Aplica acréscimo de 3% no valor total
            return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        } else if (metodoDePagamento === 'debito') {
            return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        } else {
            return "Forma de pagamento inválida!";
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
