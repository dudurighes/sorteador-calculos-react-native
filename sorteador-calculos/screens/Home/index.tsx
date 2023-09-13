import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import DadosCalculo from "../../components/DadosCalculo";

export default function Home() {
  const [resposta, setResposta] = useState("");

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operacao, setOperacao] = useState("");
  const [numeroAcertos, setNumeroAcertos] = useState(0);
  const [numeroErros, setNumeroErros] = useState(0);
  const [pontos, setPontos] = useState(0);

  const gerarCalculo = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);

    const operators = ["+", "-", "*", "/"];
    const randomOperator =
      operators[Math.floor(Math.random() * operators.length)];

    setNum1(num1);
    setNum2(num2);
    setOperacao(randomOperator);
  };

  useEffect(() => {
    gerarCalculo();
  }, []);

  function verificarRespostaUsuario() {
    if (!resposta) {
      Alert.alert("Validação", "-> Informe a resposta", [
        {
          text: "OK",
        },
      ]);
      return;
    }
    const resultado = eval(`${num1} ${operacao} ${num2}`);
    if (resultado == Number(resposta)) {
      Alert.alert("Acertou!", "Deseja uma nova conta?", [
        {
          text: "Sim",
          onPress: recriarCalculo,
        },
        {
          text: "Não",
          onPress: reiniciarJogo,
        },
      ]);
      setPontos(pontos + 10);
      setNumeroAcertos(numeroAcertos + 1);
    } else {
      Alert.alert("Errou!", "-> Deseja uma nova conta?", [
        {
          text: "Sim",
          onPress: recriarCalculo,
        },
        {
          text: "Não",
          onPress: reiniciarJogo,
        },
      ]);
      setNumeroErros(numeroErros + 1);
      setPontos(pontos - 5);
    }
  }

  function recriarCalculo() {
    gerarCalculo();
    setResposta("");
  }

  function reiniciarJogo() {
    recriarCalculo();
    setNumeroAcertos(0);
    setNumeroErros(0);
    setPontos(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSecundario}>
        <Text style={styles.titlePoints}>Você tem {pontos} pontos</Text>
        <View style={styles.containerRespostas}>
          <View style={styles.containerRespostasItem}>
            <Text style={styles.textCertas}>Certas</Text>
            <Text style={styles.respostas}>{numeroAcertos}</Text>
          </View>
          <View style={styles.containerRespostasItem}>
            <Text style={styles.textErradas}>Erradas</Text>
            <Text style={styles.respostas}>{numeroErros}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonSortear} onPress={gerarCalculo}>
          <Text style={styles.buttonSortearText}>Sortear Desafio</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerResponder}>
        <Text style={styles.globalText}>Quanto é:</Text>
        <View style={styles.containerCalculos}>
          <DadosCalculo label={num1.toString()} />
          <DadosCalculo label={operacao} />
          <DadosCalculo label={num2.toString()} />
        </View>
        <Text style={styles.globalText}>Informe sua resposta:</Text>
        <View style={styles.containerCentralizado}>
          <TextInput
            keyboardType="numeric"
            onChangeText={setResposta}
            style={styles.input}
            placeholderTextColor={"#FFF"}
            value={resposta}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.buttonValidar}
          onPress={verificarRespostaUsuario}
        >
          <Text style={styles.buttonValidarText}>Validar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerCentralizado}>
        <TouchableOpacity style={styles.buttonNovoJogo} onPress={reiniciarJogo}>
          <Text style={styles.buttonNovoJogoText}>Novo Jogo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
