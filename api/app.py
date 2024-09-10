from __future__ import annotations

from typing import Any

from api.models import SessionModel
from api.models.chart_model import ChartModel
from api.services import browse_charts, get_next_chart
from vega_datasets import data

default_df = data.movies()
session: SessionModel = SessionModel(df=default_df, filename="movies.json")


def loadData(filename: str):
  global session
  session = SessionModel(filename=filename)
  appendNextChart()
  return session.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel):
  global session
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True, mode="json")


def appendNextChart():
  global session
  chart = get_next_chart(session)
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def restoreSession(new_state: dict[str, Any] | SessionModel):
  global session
  if isinstance(new_state, dict):
    new_state = SessionModel.model_validate(new_state)
  session = new_state
  return session.model_dump(by_alias=True, mode="json")


def browseCharts(field_names: list[str]):
  global session
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]
