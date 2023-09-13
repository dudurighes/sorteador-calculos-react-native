import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  label: string;
};

export default function DadosCalculo(props: Props) {
  return (
    <View style={styles.containerDadosCalculo}>
      <Text style={styles.labelItemCalculo}>{props.label}</Text>
    </View>
  );
}
