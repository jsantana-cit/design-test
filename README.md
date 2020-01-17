# Testes de componentes e telas em Design

<img src="https://github.com/jsantana-cit/design-test/raw/master/img_readme/logo.png">

Quando estamos mantendo componentes em design (Símbolos do Sketch) precisamos garantir que todas as telas já desenvolvidas não sofram impacto de forma alguma, foi essa dor que motivou a implementação de testes via comparação de imagem. Os testes nas implementações de componentes e também das telas irá levar uma maior confiança para evolução e manutenção, pois teremos um feedback rápido e automático caso haja alguma divergência em uma tela já aprovada para o time de desenvolvimento, ou até mesmo algum elemento acidentalmente deslocado da localização original ou algo estiver com a cor diferente da versão aprovada, assim teremos um alerta rápido dessas divergencias e também a oportunidade de corrigir sem que isso vá para o time de deselvolvimento.

<img src="https://github.com/jsantana-cit/design-test/raw/master/img_readme/diretorios.png">

Desenvolvemos um script para percorrer todos os arquivos PNG de um diretório, procurar o mesmo nome de arquivo em outro diretório e verificar se essas imagens são diferentes. Precisamos ter uma pasta chamada img_approved com as imagens aprovadas, validadas após o desenvolvimento delas, por exemplo os vários usos de um componentes ou as telas desenvolvidas, a pasta deve ser congelada, não ser alterada, pois são evidências da versão correta. Termos outra pasta chamada img_current, irá conter as imagens extraídas (exportadas do Sketch) para passar por testes, esse passo é após efetuar alterações, deve ser geradas após finalizar uma demanda, e deverá passar por teste, a fim de garantir que nada sofreu impacto ou o caso de alguma alteração deva ser eleita para a pasta de aprovadas, como nova evidência da versão aprovada. A terceira pasta chamada de img_reproved irá conter apenas imagens gerada com a diferença, sendo bem especifico no que esta divergente entre a imagem atual e a aprovada (evidencia validada e eleita oficial).

<img src="https://github.com/jsantana-cit/design-test/raw/master/img_readme/relatorio.png">

Após ter o script na maquina, deve extrair as imagens do épico ou dos componentes, deve ter o mesmo nome, uma versão aprovada ficara na pasta img_approved e as extraidas para teste na img_current, o script vai percorrer as imagens da current e procurar a mesma, com o mesmo nome na pasta de aprovadas e validar se algo esta diferente entre elas, caso esteja sem nenhuma divergencia é listado no console como o nome do arquivo e a palavra ‘perfeito’, caso contrario com a palavra ‘errado’ e ira gerar uma imagem com essa diferença a salvo na pasta img_reproved.

<img src="https://github.com/jsantana-cit/design-test/raw/master/img_readme/diff-busca-responsivo.png">

Acima uma imagem gerada com a diferença, esse exemplo uma imagem aprovada continha o ícone de lupa e a imagem atual estava sem a lupa. Toda a imagem fica desfocada, em tons de cinza e apenas é evidenciado a diferença.
