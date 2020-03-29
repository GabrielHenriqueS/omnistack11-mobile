import React, { useEffect, useState } from "react";

import {
  Container,
  Header,
  Image,
  HeaderText,
  HeaderTextBold,
  Title,
  Description
} from "./styles";

import logoImg from "../../assets/logo.png";
import api from "../../services/api";

import IncidentList from "../../components/IncidentList";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);
    const response = await api.get("incidents", {
      params: { page }
    });
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents();
  }, []);
  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <HeaderText>
          Total de <HeaderTextBold>{total} casos</HeaderTextBold>.
        </HeaderText>
      </Header>
      <Title>Bem Vindo</Title>
      <Description>Escolha um dos casos abaixo e salve o dia.</Description>

      <IncidentList data={incidents} onEndReached={loadIncidents} />
    </Container>
  );
}
