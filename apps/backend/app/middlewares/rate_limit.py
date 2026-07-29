from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import settings

# In-memory storage is the deliberate choice at current volume — see the
# architecture blueprint's risk log: swap `storage_uri` to a Redis URL the
# moment more than one backend instance is running, since in-memory
# counters aren't shared across processes/instances.
limiter = Limiter(key_func=get_remote_address, default_limits=[])

CONTACT_FORM_LIMIT = settings.contact_form_rate_limit
