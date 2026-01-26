from django.urls import path
from .views import events_api,calendar_view, view_visit, create_visit_api,gestores_api,status_api,visit_detail_api, update_visit_api,delete_visit_api


urlpatterns = [
    path('api/work-plan/events/', events_api, name='work_plan_events_api'),
    path('work-plan/', calendar_view, name='work_plan_calendar'),
    path('work-plan/visit/<int:visit_id>/', view_visit, name='view_visit'),
    path(
    "api/work-plan/create/",
    create_visit_api,
    name="create_visit_api"
),
    path('api/gestores/', gestores_api, name= 'gestores_api'),
    path('api/status/', status_api, name = 'status_api'),
    path(
    "api/work-plan/visit/<int:visit_id>/",
    visit_detail_api,
    name="visit_detail_api"
),
path(
    "api/work-plan/update/<int:visit_id>/",
    update_visit_api,
    name="update_visit_api"
),
path(
    'api/work-plan/delete/<int:visit_id>/',
    delete_visit_api,
    name='delete_visit_api'
),

]
