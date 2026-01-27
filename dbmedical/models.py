from django.db import models
from django.contrib.auth.models import User

class Status(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7)  # ESTATUS DE LA VISITA EJE PLROGRAMADA

    def __str__(self):
        return self.name


class Gestor(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='gestor',
        null=True,
        blank=True
    )
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Visit(models.Model):   # DETALLES DE LA VISITA
    VISIT_TYPES = (
        ('medico', 'Médico'),
        ('institucion', 'Institución'),
    )

    title = models.CharField(max_length=200)
    visit_type = models.CharField(max_length=20, choices=VISIT_TYPES)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()

    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    gestor = models.ForeignKey(Gestor, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
