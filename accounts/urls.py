from django.urls import path
from .views import events_api,calendar_view, view_visit, create_visit_api,gestores_api,status_api, update_visit_api, create_user_api, visit_delete
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('api/work-plan/events/', events_api, name='work_plan_events_api'),
    path('work-plan/', calendar_view, name='work_plan_calendar'),
    path('work-plan/visits/<int:visit_id>/', view_visit, name='view_visit'),
    path(  "api/work-plan/create/", create_visit_api, name="create_visit_api"),
    path('api/gestores/', gestores_api, name= 'gestores_api'),
    path('api/status/', status_api, name = 'status_api'),
   
    path('work-plan/visits/<int:pk>/edit/', update_visit_api, name='update_visit_api'),
    path('work-plan/visits/<int:pk>/delete/',    visit_delete,    name='visit_delete'),


    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/users/create/', create_user_api, name='create_user_api'),

]
