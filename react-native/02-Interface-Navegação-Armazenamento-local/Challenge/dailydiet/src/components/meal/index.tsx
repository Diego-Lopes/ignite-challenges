import { Button } from "@components/button";
import { ItemInList } from "@components/itemInList";
import { TitleInList } from "@components/title";
import { dataList } from "@mock/data";
import { SectionList } from "react-native";
import { Container, Content, Title } from "./styles";


type Meal = {
  id: number;
  name: string;
  description: string;
  date: string;
  hours: string;
  isDiet: boolean;
};

export function Meal() {

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const groupedByDate = dataList.meal.reduce<Record<string, Meal[]>>((acc, meal) => {
    if (!acc[meal.date]) {
      acc[meal.date] = [];
    }
    acc[meal.date].push(meal);
    return acc;
  }, {});

  const sections = Object.keys(groupedByDate)
    .sort((a, b) => parseDate(b).getTime() - parseDate(a).getTime()) // Sort dates
    .map((date) => ({
      title: date,
      data: groupedByDate[date],
    }));

  return (
    <Container>
      <Content>
        <Title>Refeições</Title>
        <Button />
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <TitleInList title={title} />
          )}
          renderItem={({ item }) => (
            <ItemInList 
              hours={item.hours}
              description={item.name}
              isDiet={item.isDiet}
            />
          )}

          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24}}
          stickySectionHeadersEnabled
          style={{ marginTop: 12 }}
        />
      </Content>
    </Container>
  )
}