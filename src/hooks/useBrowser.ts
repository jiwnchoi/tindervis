import { router } from "@api";
import { useFieldNameMatches } from "@hooks";
import { MAX_N_SELECTED_FIELDS } from "@shared/constants";
import type { TChart } from "@shared/models";
import { useDataStore, useInteractionStore } from "@stores";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import useSessionsStore from "../stores/useSessionsStore";

export default function useBrowser() {
  const selectedFields = useInteractionStore((state) => state.searchTargetFieldNames);
  const setSelectedFields = useInteractionStore((state) => state.setSearchTargetFieldNames);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestionCursorIndex, setSuggestionCursorIndex] = useState<number>(0);

  const data = useDataStore((state) => state.data);
  const filename = useDataStore((state) => state.filename);

  const charts = useSessionsStore((state) => state.charts);
  const setCurrentChartIndex = useSessionsStore((state) => state.setCurrentChartIndex);
  const appendChart = useSessionsStore((state) => state.appendChart);

  const { data: browsedCharts = [], isLoading: loading } = useQuery({
    queryKey: ["browseCharts", filename, ...selectedFields.sort()],
    queryFn: async () => {
      if (selectedFields.length === 0 || !data) return [];
      return (await router.call("browseCharts", { fieldNames: selectedFields })) ?? [];
    },
  });

  const fieldNameMatches = useFieldNameMatches(inputValue);
  const inputDisabled = selectedFields.length >= MAX_N_SELECTED_FIELDS;

  const appendBrowsedChart = useCallback(
    async (chart: TChart) => {
      await appendChart(chart);
      setCurrentChartIndex(charts.length - 1);
    },
    [appendChart, charts.length, setCurrentChartIndex],
  );

  useEffect(() => setSuggestionCursorIndex(0), [inputValue]);

  useEffect(() => {
    if (selectedFields.length >= MAX_N_SELECTED_FIELDS) return;
    setInputValue("");
  }, [selectedFields]);

  const appendBrowseField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
    setInputValue("");
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.stopPropagation();
    }
    if (["ArrowDown", "ArrowUp"].includes(e.key) && fieldNameMatches.length > 0) {
      e.preventDefault();
      setSuggestionCursorIndex((prev) =>
        e.key === "ArrowDown"
          ? Math.min(prev + 1, fieldNameMatches.length - 1)
          : Math.max(prev - 1, 0),
      );
    }
    if (e.key === "Enter" && fieldNameMatches.length > suggestionCursorIndex) {
      appendBrowseField(fieldNameMatches[suggestionCursorIndex].item);
    }

    if (e.key === "Backspace" && inputValue === "") {
      setSelectedFields((prev) => prev.slice(0, -1));
    }
  };

  return {
    browsedCharts,
    inputDisabled,
    loading,
    fieldNameMatches,
    inputValue,
    setInputValue,
    selectedFields,
    appendBrowseField,
    appendBrowsedChart,
    suggestionCursorIndex,
    handleKeydown,
  };
}
