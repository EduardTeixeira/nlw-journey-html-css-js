const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: dayjs(data).format("MMMM"),
    hora: dayjs(data).format("HH:mm"),
  };
};

const atividadeExemplo = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true,
};

let atividades = [
  {
    nome: "Academia",
    data: new Date("2024-07-08 13:00"),
    finalizada: true,
  },
  {
    nome: "Jantar",
    data: new Date("2024-07-08 18:00"),
    finalizada: false,
  },
];

//atividades = [];

const criarItemDeAtividade = (atividade) => {
  const dataFormatada = formatador(atividade.data);

  return `
  <div>
    <input type="checkbox" onchange="concluirAtividade(event)" value="${
      atividade.data
    }" ${atividade.finalizada ? "checked" : ""}>
    <span>${atividade.nome}</span>
    <time>
      ${dataFormatada.dia.semana.longo}, 
      dia ${dataFormatada.dia.numerico}
      de ${dataFormatada.mes}
      às ${dataFormatada.hora}h
    </time>
  </div>`;
};

const atualizarListaDeAtividades = () => {
  const section = document.querySelector("section");
  section.innerHTML = "";

  if (atividades.length == 0) {
    section.innerHTML = "<p>Nenhuma atividade cadastrada.</p>";
    return;
  }

  for (let atividade of atividades) {
    section.innerHTML += criarItemDeAtividade(atividade);
  }
};

atualizarListaDeAtividades();

const salvarAtividade = (event) => {
  event.preventDefault();

  const dadosFormulario = new FormData(event.target);

  const nome = dadosFormulario.get("atividade");
  const dia = dadosFormulario.get("dia");
  const hora = dadosFormulario.get("hora");
  const data = `${dia} ${hora}`;

  const novaAtividade = {
    nome,
    data,
    finalizada: false,
  };

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data;
  });
  console.log(atividadeExiste);

  if (atividadeExiste) {
    return alert("Dia/Hora não disponível.");
  }

  atividades = [novaAtividade, ...atividades];
  atualizarListaDeAtividades();
};

const criarDiasSelecao = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ];

  let diasSelecao = "";

  for (let dia of dias) {
    const formatar = formatador(dia);

    diasSelecao += `
    <option value="${dia}">
      ${formatar.dia.numerico} 
      de ${formatar.mes}
    </option>
    `;
  }

  document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
};
criarDiasSelecao();

const criarHorasSelecao = () => {
  let horasDisponiveis = "";

  for (let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, "0");
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`;
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`;
  }

  document.querySelector('select[name="hora"]').innerHTML = horasDisponiveis;
};
criarHorasSelecao();

const concluirAtividade = (event) => {
  const input = event.target;
  const dataInput = input.value;

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataInput;
  });

  if (!atividade) {
    return;
  }

  atividade.finalizada = !atividade.finalizada;

  console.log("concluirAtividade()...", atividade);
};
