import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  IncidentsList,
  Incident,
  IncidentProperty,
  IncidentValue,
  DetailsButton,
  DetailsButtonText
} from "./styles";

export default function IncidentList({ data, onEndReached }) {
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", {
      incident
    });
  }
  return (
    <IncidentsList
      data={data}
      keyExtractor={incident => String(incident.id)}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      renderItem={({ item: incident }) => (
        <Incident>
          <IncidentProperty>ONG:</IncidentProperty>
          <IncidentValue>{incident.name}</IncidentValue>

          <IncidentProperty>CASO:</IncidentProperty>
          <IncidentValue>{incident.title} </IncidentValue>

          <IncidentProperty>VALOR:</IncidentProperty>
          <IncidentValue>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(incident.value)}
          </IncidentValue>

          <DetailsButton
            onPress={() => {
              navigateToDetail(incident);
            }}
          >
            <DetailsButtonText>Ver mais detalhes</DetailsButtonText>
            <Feather name="arrow-right" size={16} color="#e02041" />
          </DetailsButton>
        </Incident>
      )}
    ></IncidentsList>
  );
}
