from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from dbmedical.models import Visit, Gestor, Status,User
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime
import json



@login_required
def events_api(request):
    visits = Visit.objects.select_related('status', 'gestor')

    gestor = request.GET.get('gestor')
    status = request.GET.get('status')
    visit_type = request.GET.get('type')
    if not request.user.is_superuser:
        visits = visits.filter(gestor__user=request.user)
    if gestor:
        visits = visits.filter(gestor_id=gestor)

    if status:
        visits = visits.filter(status_id=status)

    if visit_type:
        visits = visits.filter(visit_type=visit_type)

    events = []
    for visit in visits:
        events.append({
            "id": visit.id,
            "title": visit.title,
            "start": visit.start_datetime.isoformat(),
            "end": visit.end_datetime.isoformat(),
            "type": visit.visit_type,
            "status_color": visit.status.color,
            "gestor": visit.gestor.id,
            "status": visit.status.id,
        })

    return JsonResponse(events, safe=False)

@login_required
def calendar_view(request):
    return render(request, 'accounts/work_plan/calendar.html')

@login_required
def view_visit(request, visit_id):
    visit = get_object_or_404(Visit, id=visit_id)
    return render(request, 'accounts/work_plan/visit_detail.html', {
        'visit': visit
    })
@csrf_exempt
@login_required
def create_visit_api(request):
    if not request.user.is_superuser:
        return JsonResponse({"error": "Unauthorized"},status= 403)
    if request.method == "POST":
        data = json.loads(request.body)

        visit = Visit.objects.create(
            title=data["title"],
            start_datetime=parse_datetime(data["start"]),
            end_datetime=parse_datetime(data["end"]),
              visit_type=data["type"],
            status=Status.objects.get(id=data["status"]),
            gestor=Gestor.objects.get(id=data["gestor"])
        )

        return JsonResponse({
            "success": True,
            "id": visit.id
        })


## EDITAR VISITA
@csrf_exempt
@login_required
def update_visit_api(request, pk):
    visit = get_object_or_404(Visit, id=pk)

    if request.method == "POST":
        visit.title = request.POST.get("title")
        visit.start_datetime = parse_datetime(request.POST.get("start"))
        visit.end_datetime = parse_datetime(request.POST.get("end"))
        visit.status = Status.objects.get(id=request.POST.get("status"))
        visit.gestor = Gestor.objects.get(id=request.POST.get("gestor"))
        visit.visit_type = request.POST.get("type")

        visit.save()
        return redirect('view_visit', visit.id)

    return render(request, 'accounts/work_plan/visit_edit.html', {
        'visit': visit,
        'gestores': Gestor.objects.all(),
        'statuses': Status.objects.all(),
    })

        


def gestores_api(request):
    data = list(Gestor.objects.values('id', 'name'))
    return JsonResponse(data, safe=False)

def status_api(request):
    data = list(Status.objects.values('id', 'name'))
    return JsonResponse(data, safe=False)
   
@csrf_exempt
@login_required
def create_user_api(request):
    if not request.user.is_staff:
        return JsonResponse({"error": "Unauthorized"}, status=403)

    data = json.loads(request.body)

    user = User.objects.create_user(
        username=data["username"],
        password=data["password"]
    )

    if data["role"] == "admin":
        user.is_staff = True
        user.is_superuser = True
        user.save()
    else:
        Gestor.objects.create(user=user, name=data["username"])

    return JsonResponse({"success": True})



@login_required
def visit_delete(request, pk):
    visit = get_object_or_404(Visit, pk=pk)

    if not request.user.is_staff:
        return redirect('work_plan_calendar')

    visit.delete()
    return redirect('work_plan_calendar')